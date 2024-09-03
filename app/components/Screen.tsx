import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Platform,
} from "react-native";

const Screen = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
