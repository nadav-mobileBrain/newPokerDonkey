import { View, StyleSheet } from "react-native";
import React from "react";
import AppText from "../AppText";
import colors from "../../config/colors";

const AllGamesCardHeader = () => {
  return (
    <View style={styles.container}>
      <AppText style={[styles.headline, styles.rank]}>Rank</AppText>
      <AppText style={[styles.headline, styles.player]}>Player</AppText>
      <AppText style={[styles.headline, styles.data]}>Profit</AppText>
      <AppText style={[styles.headline, styles.data]}>Buy In</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    width: "100%",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: colors.gold,
  },
  headline: {
    fontSize: 15,
    // color: colors.white,
  },
  rank: {
    flex: 1,
    textAlign: "center",
  },
  player: {
    flex: 2,
    textAlign: "center",
  },
  data: {
    flex: 1,
    textAlign: "center",
  },
});

export default AllGamesCardHeader;
