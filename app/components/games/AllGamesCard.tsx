import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Toast } from "toastify-react-native";

import AppText from "../AppText";
import AllGamesCardHeader from "./AllGamesCardHeader";
import AllGamesPlayers from "./AllGamesPlayers";
import colors from "../../config/colors";
import dayjs from "dayjs";
import Icon from "../Icon";
import ListitemSeperator from "../ListitemSeperator";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import routes from "../../navigation/routes";
import useAuth from "../../auth/useAuth";

type RootStackParamList = {
  EditGame: {
    gameDetails: any; // Replace `any` with the specific type if known
    user: any | null; // Define `User` type if it's not already defined
  };
  // Add other routes here as needed
};

type AllGamesCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditGame"
>;

// interface AllGamesCardProps {
//   game: any; // Replace `any` with the specific type if known
// }

const AllGamesCard = ({ game }: any) => {
  const navigation = useNavigation<AllGamesCardNavigationProp>();
  const { user } = useAuth();

  const flickerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(flickerAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [flickerAnim]);

  const editGame = () => {
    const userId = user?.userId;
    const gameAdmin = game.game_manager_id;
    if (userId !== gameAdmin) {
      Toast.warn("Only game manager can edit the game", "top");
      return;
    }
    navigation.navigate(routes.EDIT_GAME, {
      gameDetails: game,
      user,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={editGame}>
        <Icon
          name="pen"
          size={30}
          backgroundColor={colors.gold}
          iconColor={colors.blue}
        />
        <AppText style={styles.iconText}>Edit Game</AppText>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <AppText style={styles.date}>
          {dayjs(game.created_at).format("DD/MM/YYYY")}
        </AppText>
        <AppText style={styles.time}>
          {dayjs(game.created_at).format("HH:mm")}-
          {dayjs(game.updated_at).format("HH:mm")}
        </AppText>
        <AppText style={styles.gameManager}>
          Game Manager: {game?.game_manager?.nickName}
        </AppText>
        {game.was_edited && (
          <AppText style={styles.edited}>
            Edited on {dayjs(game.updated_at).format("DD/MM/YYYY")}
          </AppText>
        )}
        {game.isOpen && (
          <Animated.Text
            style={[
              styles.isOpen,
              {
                textShadowRadius: flickerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 10],
                }),
                textShadowColor: flickerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.green, colors.darkGreen],
                }),
              },
            ]}>
            Live Game
          </Animated.Text>
        )}
      </View>

      <FlatList
        data={game.user_games}
        keyExtractor={(item) => item.user_id.toString()}
        ListHeaderComponent={<AllGamesCardHeader />}
        renderItem={({ item }) => <AllGamesPlayers player={item} />}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

// Updated styles for a modern look
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: colors.lightBlue, // Changed to a lighter background
  },
  edited: {
    width: "100%",
    textAlign: "center",
    padding: 5,
    color: colors.secondary,
    fontSize: 12,
    fontStyle: "italic", // Added italic style for emphasis
  },
  icon: {
    top: 10,
    position: "absolute",
    zIndex: 1,
    right: 10,
  },
  iconText: {
    textAlign: "center",
    color: colors.blue,
    fontSize: 10, // Increased font size for better readability
    justifyContent: "center",
    right: 5,
  },
  isOpen: {
    width: "100%",
    textAlign: "center",
    padding: 5,
    fontSize: 18, // Increased font size for emphasis
    color: colors.green,
    textShadowColor: colors.green,
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
  date: {
    fontSize: 16, // Modern font size
    color: colors.darkGray, // Changed color for modern look
    fontWeight: "bold", // Added bold for emphasis
  },
  time: {
    fontSize: 14, // Modern font size
    color: colors.gray, // Changed color for modern look
  },
  gameManager: {
    width: "100%",
    textAlign: "center",
    color: colors.darkGray, // Changed color for modern look
    fontSize: 14, // Modern font size
  },
  detailsContainer: {
    padding: 15, // Increased padding for a spacious look
    alignItems: "center",
  },
});

export default AllGamesCard;
