import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import routes from "../../navigation/routes";
import colors from "../../config/colors";
import { NavigationProp } from "@react-navigation/native";

const CreatejoinLeagues = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(routes.JOIN_LEAGUE)}>
        <AppText style={styles.text}>Join a private league</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(routes.CREATE_LEAGUE)}>
        <AppText style={styles.text}>+Create a league</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto_700Bold",
    color: colors.light,
  },
});

export default CreatejoinLeagues;
