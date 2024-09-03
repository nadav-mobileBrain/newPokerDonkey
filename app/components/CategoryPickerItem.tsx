import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import AppText from "./AppText";

interface CategoryPickerItemProps {
  item: {
    backgroundColor: string;
    icon: string;
    label: string;
  };
  onPress: () => void;
}

const CategoryPickerItem = ({ item, onPress }: CategoryPickerItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
        <AppText style={styles.label}>{item.label}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
