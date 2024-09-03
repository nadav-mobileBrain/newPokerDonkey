import { View, StyleSheet, Image } from "react-native";
import React from "react";
import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";

const AllGamesPlayers = ({ player }: any) => {
  const playerDetails = player?.User;

  return (
    <View style={styles.container}>
      <AppText style={[styles.rank, styles.playerData]}>
        {player.game_rank}
      </AppText>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: playerDetails?.image.startsWith("https")
              ? playerDetails?.image
              : `${config.s3.baseUrl}${playerDetails?.image}`,
          }}
          style={styles.playerImage}
        />
        <AppText style={styles.playerName}>{playerDetails.nickName}</AppText>
      </View>
      <AppText
        style={[
          styles.playerData,
          { color: player.profit > 0 ? "green" : "red" },
          styles.data,
        ]}>
        {player.profit}
      </AppText>
      <AppText style={[styles.playerData, styles.data]}>
        {player.buy_ins_amount}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    width: "100%",
    padding: 5,
    justifyContent: "space-around",
    backgroundColor: colors.white,
  },
  playerData: {
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 2,
  },
  rank: {
    fontSize: 12,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.purple,
    borderWidth: 3,
  },
  playerName: {
    fontSize: 10,
    color: colors.purple,
  },
  data: {
    flex: 1,
  },
});

export default AllGamesPlayers;
