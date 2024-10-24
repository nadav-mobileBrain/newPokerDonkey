import { View, Image, StyleSheet } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/appLogo.webp")} />
      <AppText style={[defaultStyles.text, styles.title]}>Poker Donkey</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.gold,
    borderWidth: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    color: colors.gold,
    textDecorationLine: "underline",
    marginTop: 5,
  },
});

export default AppLogo;
