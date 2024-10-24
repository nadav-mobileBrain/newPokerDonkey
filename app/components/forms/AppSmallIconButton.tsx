///create a small button with an icon and a text
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
// Define a type for the keys of the colors object
type ColorKeys = keyof typeof colors;
interface AppSmallIconButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  onPress: () => void;
  color?: ColorKeys;
  textColor?: ColorKeys;
  accessibilityHint?: string;
}
const AppSmallIconButton = ({
  icon,
  title,
  onPress,
  color = "blue",
  textColor,
  accessibilityHint = "Tap to press the button",
}: AppSmallIconButtonProps) => {
  const backgroundColor = colors[color] || colors.blue;
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      backgroundColor: Array.isArray(backgroundColor)
        ? backgroundColor[0]
        : backgroundColor,
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        accessibilityLabel={title}
        accessibilityHint={accessibilityHint}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={20} color={textColor} />
        )}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the content within the button
    backgroundColor: colors.gold,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    marginLeft: 5,
  },
});

export default AppSmallIconButton;
