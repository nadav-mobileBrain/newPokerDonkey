import React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import Aptabase from "@aptabase/react-native";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import * as Font from "expo-font";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import logger from "./app/utility/logger";

Aptabase.init("A-EU-9645623283"); // 👈 this is where you enter your App Key

logger.start();

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    console.log("🚀 ~ restoreUser ~ user:", user);

    if (user) {
      setUser(user);
      Aptabase.trackEvent("User Restored", { user: JSON.stringify(user) });
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto_400Regular,
      Roboto_700Bold,
      Roboto_500Medium,
    });
    setFontsLoaded(true);
  };

  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    restoreUser();
    loadFonts();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
