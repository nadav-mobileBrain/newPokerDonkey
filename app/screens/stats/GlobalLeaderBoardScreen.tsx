import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ListRenderItemInfo,
  FlatListProps,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import config from "../../config/config";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import colors from "../../config/colors";
import HeaderText from "../../components/HeaderText";
import AppText from "../../components/AppText";

interface LeaderBoardItem {
  image: string;
  nickName: string;
  totalProfit: number;
  user_id: number;
}

// Define a more specific type for our AnimatedFlatList
type AnimatedFlatListType = Animated.AnimatedComponent<
  React.ComponentClass<FlatListProps<LeaderBoardItem>, any>
>;

// Create the AnimatedFlatList with the specific type
const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as AnimatedFlatListType;

const GlobalLeaderBoardScreen: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardItem[]>([]);
  const getGlobalLeaderBoardApi = useApi(statsApi.getGlobalLeaderBoard);
  const scrollY = new Animated.Value(0);

  const getLeaderBoard = async () => {
    const response = await getGlobalLeaderBoardApi.request();

    if (!response.ok) {
      setError(
        (response.data as any)?.error || "An unexpected error occurred."
      );
      return;
    }
    setLeaderBoard(response.data as LeaderBoardItem[]);
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const renderItem = ({ item, index }: ListRenderItemInfo<LeaderBoardItem>) => {
    const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
    const opacityInputRange = [-1, 0, 100 * index, 100 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[styles.itemContainer, { opacity, transform: [{ scale }] }]}>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>{index + 1}</Text>
        </View>
        <Image
          source={{
            uri: item.image.startsWith("https")
              ? item.image
              : `${config.s3.baseUrl}${item.image}`,
          }}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.nickname}>{item.nickName}</Text>
          <Text style={styles.profit}>
            Total Profit:
            {item.totalProfit.toLocaleString()} $
          </Text>
        </View>
        <MaterialCommunityIcons
          name="crown"
          size={24}
          color={index < 3 ? colors.gold : colors.medium}
        />
      </Animated.View>
    );
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={getGlobalLeaderBoardApi.loading} />
      <ImageBackground
        blurRadius={5}
        style={styles.background}
        source={require("../../assets/cardstats.webp")}>
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <HeaderText style={styles.headerText}>Global Leaderboard</HeaderText>
          <AppText style={{ color: colors.gold }}>Top Players</AppText>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <AnimatedFlatList
          data={leaderBoard}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      </ImageBackground>
    </Screen>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.7,
  },

  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.gold,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    // backgroundColor: colors.medium,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.gold,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rankText: {
    color: colors.dark,
    fontWeight: "bold",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  profit: {
    fontSize: 14,
    color: colors.gold,
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default GlobalLeaderBoardScreen;
