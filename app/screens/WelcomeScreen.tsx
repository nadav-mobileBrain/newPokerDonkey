import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppLogo from "../components/AppLogo";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import { useAptabase } from "../hooks/useAptabase";
import authApi from "../api/auth";
import AppText from "../components/AppText";
import HowToPlay from "../components/HowToPlay";
import Screen from "../components/Screen";
import users from "../api/users";

import { NavigationProp } from "@react-navigation/native";

interface UserInfo {
  email: string;
  expoPushToken?: string;
  familyName: string;
  givenName: string;
  google_id: string;
  id: number;
  nickName?: string;
  created_at?: string;
  is_active?: boolean;
  last_login?: string;
  token?: string;
  updated_at?: string;
}

const WelcomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { trackEvent } = useAptabase();
  const { logIn, logOut } = useAuth();

  const getTestUserDetailsApi = useApi(users.getTestUserDetails);

  const takeATour = async () => {
    try {
      logOut();
      const result = await getTestUserDetailsApi.request();

      if (!result.ok) {
        console.log("🚀 ~ takeATour ~ result.data:", result.data);
        return;
      }
      const testUser: UserInfo = (result.data as any).testUser;
      const loginAsGuest = await authApi.login(testUser);
      logIn(loginAsGuest.data);
      trackEvent("login as guest");
    } catch (error) {
      console.error("Error during guest login", error);
    }
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/appLogo.webp")}
        blurRadius={3}>
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <AppLogo />
            <Text style={styles.tagLine}>Manage Your Home Poker Games</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.headerInfoTagLine}>
              Collect and display stats of your league's games.
            </Text>
            <Text style={styles.infoTagLine}>
              Create or join a league with your friends and track every home
              cash game . See who comes out on top and who needs to sharpen
              their poker skills. Share your results and challenge each other to
              be the best!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Take A Tour"
              color="secondary"
              onPress={() => takeATour()}
              icon="arrow-right-bold-outline"
            />
            <AppButton
              title="Register/Login"
              color="gold"
              onPress={() => navigation.navigate("Register")}
              icon="account-plus"
            />
            <HowToPlay navigation={navigation} />
            <AppText
              style={styles.tAndC}
              onPress={() => navigation.navigate("TermsAndConditions")}>
              Terms & Conditions
            </AppText>
            <AppText
              style={styles.tAndC}
              onPress={() => navigation.navigate("PrivacyPolicy")}>
              Privacy Policy
            </AppText>
            <AppText style={styles.developerText}>
              Developed By Nadav Galili 🧙‍♂️
            </AppText>
          </View>
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "10%",
    flex: 1,
  },
  tagLine: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
    color: colors.gold,
    textAlign: "center",
  },
  info: {
    padding: 20,
    alignItems: "center",
    marginVertical: 20,
  },
  headerInfoTagLine: {
    fontSize: 15,
    color: colors.gold,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoTagLine: {
    fontSize: 13,
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    paddingBottom: 20,
  },
  developerText: {
    color: colors.gold,
    textAlign: "center",
    marginTop: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.75,
  },
  tAndC: {
    color: colors.light,
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
