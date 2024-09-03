import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const PlayerDetailsDeleteActions = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          color={colors.white}
          size={35}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerDetailsDeleteActions;
