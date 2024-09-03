import React from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import { navigationRef } from "../../navigation/rootNavigation";
import routes from "../../navigation/routes";

interface PlayerInfoProps {
  leaguePlayers: any[];
  onPress?: (item: any) => void;
  width?: number;
  height?: number;
  borderColor?: string;
}

const PlayerInfo = ({
  leaguePlayers,
  onPress,
  width = 30,
  height = 30,
  borderColor = "purple",
}: PlayerInfoProps) => {
  if (!onPress)
    onPress = (item) =>
      navigationRef?.current?.navigate(routes.PERSONAL_STATS, {
        userDetails: item.User,
      });
  return (
    <View style={styles.container}>
      <FlatList
        data={leaguePlayers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={6} // Adjust this number based on how many items you want per row
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={styles.playerContainer}>
            <Image
              style={[
                styles.image,
                {
                  width,
                  height,
                  borderColor: colors[borderColor as keyof typeof colors],
                } as any,
              ]}
              source={{
                uri: item.User.image.startsWith("http")
                  ? item.User.image
                  : `${config.s3.baseUrl}${item.User.image}`,
              }}
            />
            <AppText style={styles.playerName}>{item.User.nickName}</AppText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
  },
  image: {
    borderRadius: 60,
    height: 30,
    width: 30,
    borderColor: colors.purple,
    borderWidth: 2,
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  playerName: {
    color: colors.purple,
    fontSize: 7,
    textAlign: "center",
  },
});

export default PlayerInfo;
