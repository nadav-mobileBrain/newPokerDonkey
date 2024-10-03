import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import { NavigationProp } from "@react-navigation/native";

const leagueObject = {
  admin_id: 203,
  created_at: "2024-08-15T07:09:50.000Z",
  id: 12,
  leagueAdmin: {
    id: 203,
    image: "uploads/anonymous.png",
    nickName: "test user",
  },
  league_image: "leagueAvatars/league.jpg",
  league_name: "demo league",
  league_number: 37516,
  updated_at: "2024-08-15T07:09:50.000Z",
};

const NoLeagues = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={styles.noLeaguesContainer}>
      {/* <Image
        source={require("../../assets/noLeagues.png")}
        style={styles.image}
      /> */}
      <AppText style={{ color: colors.gold, fontSize: 18 }}>
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
      <AppText style={{ color: colors.gold, fontSize: 18, marginTop: 50 }}>
        Want to see how your stats will look like?
      </AppText>
      <AppButton
        title="Check out demo stats"
        onPress={() =>
          navigation.navigate(routes.STATS, { league: leagueObject })
        }
        color="lightBlue"
        icon="chart-bar"
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
