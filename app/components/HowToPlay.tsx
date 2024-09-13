import React from "react";
import { TouchableOpacity, TextStyle, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

import AppText from "./AppText";
import colors from "../config/colors";

type HowToPlayProps = {
  navigation: NavigationProp<any>;
  textColor?: keyof typeof colors;
  align?: TextStyle["textAlign"];
};

const HowToPlay: React.FC<HowToPlayProps> = ({
  navigation,
  textColor = "light",
  align = "center",
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HowToPlay")}>
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={18}
          color={colors.white}
        />
        <AppText
          style={[
            styles.helpLink,
            {
              color: Array.isArray(colors[textColor])
                ? colors[textColor].join("")
                : colors[textColor],
              textAlign: align,
            },
          ]}>
          How To Play
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingRight: 10,
    paddingTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  helpLink: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 5,
  },
});

export default HowToPlay;
