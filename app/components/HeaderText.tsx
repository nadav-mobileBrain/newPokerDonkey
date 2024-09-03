import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import colors from "../config/colors";

interface HeaderTextProps {
  children: string;
  style?: any;
}

const HeaderText = ({ children, style }: HeaderTextProps) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: Platform.OS === "android" ? "Roboto_500Medium" : "Avenir",
    color: colors.dark,
    textAlign: "center",
    marginTop: 10,
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
});

export default HeaderText;
