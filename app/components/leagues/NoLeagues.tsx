import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import { NavigationProp } from "@react-navigation/native";

const NoLeagues = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.noLeaguesContainer}>
      {/* <Image
        source={require("../../assets/noLeagues.png")}
        style={styles.image}
      /> */}
      <AppText style={{ color: colors.gold }}>
        You dont belong to any leagues yet...😳
      </AppText>
      <AppButton
        title="Join private league"
        onPress={() => navigation.navigate(routes.JOIN_LEAGUE)}
        color="secondary"
        icon="account-group"
      />
      <AppButton
        title="Create a new  league"
        onPress={() => navigation.navigate(routes.CREATE_LEAGUE)}
        icon="account-multiple-plus"
        color="gold"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noLeaguesContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
    borderRadius: 15,
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
});

export default NoLeagues;
