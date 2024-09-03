import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

import AppText from "./AppText";

function PickerItem({
  item,
  onPress,
}: {
  item: { backgroundColor: string; icon: string; label: string };
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80} />
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
