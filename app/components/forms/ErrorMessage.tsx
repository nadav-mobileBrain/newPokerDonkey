import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

interface ErrorMessageProps {
  error: any;
  visible: any;
}

function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
