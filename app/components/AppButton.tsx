import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

// Define a type for the keys of the colors object
type ColorKeys = keyof typeof colors;

// Define the props type for the component
interface AppButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: ColorKeys;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  accessibilityHint?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  color = "blue",
  icon,
  accessibilityHint = "Tap to press the button",
}) => {
  // Ensure that the color is a valid key in the colors object
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
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}>
      <View style={styles.content}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={colors.dark}
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
