import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";

const GameHeader = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Player</AppText>
      <AppText style={styles.title}>Buy In</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.gold,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blue,
    textDecorationColor: colors.blue,
    textDecorationLine: "underline",
  },
});

export default GameHeader;
