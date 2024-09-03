import { View, StyleSheet } from "react-native";
import React from "react";
import dayjs from "dayjs";
import AppText from "../AppText";
import colors from "../../config/colors";

const PersonalStatsGamesDetails = ({ game, index }: any) => {
  const formattedDate = dayjs(game.created_at).format("DD/MM");
  const isOddLine = index % 2 !== 0; // Check if the line is odd based on the index

  return (
    <View style={[styles.container, isOddLine && styles.oddLine]}>
      <AppText style={styles.league}>{game?.league?.league_name}</AppText>
      <AppText style={styles.others}> {formattedDate}</AppText>
      <AppText
        style={[styles.others, { color: game?.profit > 0 ? "green" : "red" }]}>
        {" "}
        {game?.profit}
      </AppText>
      <AppText style={styles.others}> {game?.buy_ins_amount}</AppText>
      <AppText style={styles.others}> {game?.game_rank}</AppText>
      <AppText style={styles.others}> {game?.season_rank}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  oddLine: {
    backgroundColor: colors.light,
  },
  league: {
    fontSize: 9,
    width: "15%",
    textAlign: "center",
  },
  others: {
    fontSize: 12,
    textAlign: "center",
    width: "15%",
  },
});

export default PersonalStatsGamesDetails;
