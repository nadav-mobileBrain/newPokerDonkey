import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAptabase } from "../hooks/useAptabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import PlayerDetails from "../components/player/PlayerDetails";
import ListitemSeperator from "../components/ListitemSeperator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import config from "../config/config";
import routes from "../navigation/routes";
import ToastContainer, { Toast } from "toastify-react-native";

const menuItems = [
  {
    title: "Edit Profile",
    icon: {
      name: "account",
      backgroundColor: colors.blue,
    },
    targetScreen: "EditProfile",
  },

  // {
  //   title: "My Messages-Coming soon...",
  //   icon: {
  //     name: "email",
  //     backgroundColor: colors.AccentPurple,
  //   },
  //   targetScreen: "Messages",
  // },
  {
    title: "Notifications",
    icon: {
      name: "bell",
      backgroundColor: colors.purple,
    },
    targetScreen: "Notifications",
  },
];

const AccountScreen = ({ navigation }: { navigation: any }) => {
  const { user, logOut } = useAuth();
  const { trackEvent } = useAptabase();

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId:
        "642539761997-uu7qdgioieccn89baa9v8tkhc84r0nbu.apps.googleusercontent.com",
    });
  };

  const handleLogout = async () => {
    configureGoogleSignin();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    logOut();
  };

  return (
    <>
      <ActivityIndicator visible={!user} />
      <Screen style={styles.screen}>
        <ToastContainer style={{ width: "100%", top: 20 }} position="top" />
        <LinearGradient
          colors={colors.secondaryGradientArray}
          style={styles.background}>
          <View style={styles.container}>
            <PlayerDetails
              title={user?.nickName}
              subTitle="Go To Personal Stats"
              image={{
                uri: user?.image?.startsWith("https")
                  ? user.image
                  : `${config.s3.baseUrl}${user?.image}`,
              }}
              onPress={() => {
                navigation.navigate(routes.PERSONAL_STATS);
              }}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              renderItem={({ item }) => (
                <PlayerDetails
                  title={item.title}
                  IconComponent={
                    <Icon
                      name={item.icon.name}
                      backgroundColor={item.icon.backgroundColor}
                    />
                  }
                  onPress={() => {
                    trackEvent("Account Screen", {
                      item: item.title,
                      userId: user?.userId,
                    });
                    if (
                      (item.title === "Edit Profile" ||
                        item.title === "Notifications") &&
                      user?.nickName === "test user"
                    ) {
                      Toast.error("You cannot edit the test user", "error");
                      return;
                    }
                    navigation.navigate(item.targetScreen, { user });
                  }}
                  ItemsSeperatorComponent={ListitemSeperator}
                />
              )}
            />
          </View>
          <View></View>
          <PlayerDetails
            title="Log Out"
            IconComponent={
              <Icon name="logout" backgroundColor={colors.secondary} />
            }
            onPress={() => handleLogout()}
          />
        </LinearGradient>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  screen: {
    flex: 1,
  },
});

export default AccountScreen;
