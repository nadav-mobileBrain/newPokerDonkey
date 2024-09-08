import React from "react";
import { Text, TextProps, TextStyle } from "react-native"; // Import TextStyle for style prop typing
import defaultStyles from "../config/styles";

interface AppTextProps extends TextProps {
  children: React.ReactNode; // Ensure children is typed as React.ReactNode
  style?: TextStyle | TextStyle[]; // Allow for single style object or array of styles
}

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  ...otherProps
}) => {
  return (
    <Text
      style={[defaultStyles.text, style]}
      {...otherProps}
      accessibilityLabel="AppText" // Add accessibilityLabel
      accessibilityHint="Text component for the app" // Add accessibilityHint
    >
      {children}
    </Text>
  );
};

export default AppText;
