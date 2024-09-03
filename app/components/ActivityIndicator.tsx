import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/newCards.json")}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
    justifyContent: "center", // Added to center the Lottie animation
    alignItems: "center", // Added to center the Lottie animation
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default ActivityIndicator;
