import { TouchableOpacity, TextStyle } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../config/colors";
import { NavigationProp } from "@react-navigation/native";

type HowToPlayProps = {
  navigation: NavigationProp<any>;
  textColor?: keyof typeof colors; // Ensure textColor matches the keys in the colors object
  align?: TextStyle["textAlign"]; // Use the textAlign type from TextStyle
};

const HowToPlay: React.FC<HowToPlayProps> = ({
  navigation,
  textColor = "secondary",
  align = "center",
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("HowToPlay")}>
      <AppText
        style={[
          styles.helpLink,
          { color: colors[textColor], textAlign: align },
        ]}>
        How To Play?
      </AppText>
    </TouchableOpacity>
  );
};

const styles = {
  helpLink: {
    color: colors.secondary,
    fontSize: 16,
    // fontWeight: "700",
    textAlign: "center" as TextStyle["textAlign"], // Ensuring the textAlign is of type TextStyle['textAlign']
    textDecorationLine: "underline" as TextStyle["textDecorationLine"],
    marginVertical: 2,
  },
};

export default HowToPlay;
