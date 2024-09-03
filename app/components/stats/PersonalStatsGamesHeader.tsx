import { View, StyleSheet } from "react-native";
import React from "react";
import AppText from "../AppText";
import colors from "../../config/colors";

const PersonalStatsGamesHeader = () => {
  return (
    <View style={styles.header}>
      <AppText style={styles.headerTitle}> League </AppText>
      <AppText style={styles.headerTitle}> Date</AppText>
      <AppText style={styles.headerTitle}> Profit</AppText>
      <AppText style={styles.headerTitle}> Buy Ins</AppText>
      <AppText style={styles.headerTitle}> G. Rank</AppText>
      <AppText style={styles.headerTitle}> S. Rank</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    backgroundColor: colors.gold,
    padding: 8,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  headerTitle: {
    fontSize: 12,
  },
});

export default PersonalStatsGamesHeader;
