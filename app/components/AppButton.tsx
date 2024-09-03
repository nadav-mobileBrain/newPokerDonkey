import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

// Define the props type for the component
interface AppButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color?: keyof typeof colors; // Ensures the color is a key from the colors object
  icon?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  color = "blue",
  icon = "",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}>
      <View style={styles.content}>
        {icon && (
          <MaterialCommunityIcons
            name={icon as any} // If you want strict typing, define icon as a union type of allowed strings
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
    backgroundColor: colors.blue,
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
