import { View, StyleSheet, Image, TextInput } from "react-native";
import React from "react";
import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import AppTextInput from "../AppTextInput";

const AllGamesPlayersEditForm = ({ player, onUpdate }: any) => {
  const playerDetails = player?.User;

  const handleChange = (field: any, value: any) => {
    onUpdate(player.user_id, field, value);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.rank}>{player.game_rank}</AppText>
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
      <AppTextInput
        style={styles.playerData}
        keyboardType="numeric"
        value={String(player.profit)}
        onChangeText={(value: any) => handleChange("profit", value)}
      />
      <AppTextInput
        style={[styles.playerData, styles.data]}
        width="15%"
        keyboardType="numeric"
        value={String(player.buy_ins_amount)}
        onChangeText={(value: any) => handleChange("buy_ins_amount", value)}
      />
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
    backgroundColor: colors.light,
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 2,
  },
  rank: {
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
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

export default AllGamesPlayersEditForm;
