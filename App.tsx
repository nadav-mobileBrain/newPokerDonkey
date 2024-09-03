import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from "@react-native-google-signin/google-signin";
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
// Define the user type based on what GoogleSignin.signIn() returns
interface GoogleUser {
  idToken: string | null;
  accessToken: string | null;
  user: {
    email: string;
    id: string;
    givenName: string;
    familyName: string;
    photo: string | null;
    googleId: string;
  };
}
Aptabase.init("A-EU-6948664941"); // 👈 this is where you enter your App Key

export default function App() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    console.log("🚀 ~ restoreUser ~ user:", user);

    // console.log("🚀 ~ restoreUser ~ user:", user);
    //if (user) setUser(user);
    // Aptabase.trackEvent('User Restored', { userId: user?.userId });
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      // "Montserrat-Regular": require("./app/assets/fonts/Montserrat-VariableFont_wght.ttf"),
      // "Montserrat-Light": require("./app/assets/fonts/Montserrat-Light.ttf"),
      // "Montserrat-SemiBold": require("./app/assets/fonts/Montserrat-SemiBold.ttf"),
      Roboto_400Regular,
      Roboto_700Bold,
      Roboto_500Medium,
    });
    setFontsLoaded(true);
  };

  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<GoogleUser | null>(null);

  useEffect(() => {
    restoreUser();
    loadFonts();
    //GoogleSignin.configure();
  }, []);

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const user = await GoogleSignin.signIn();
  //     setUserInfo(user as unknown as GoogleUser);
  //     setError(null);
  //   } catch (error: unknown) {
  //     // Handle the error type
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else {
  //       setError(String(error));
  //     }
  //   }
  // };
  // const logOut = () => {
  //   setUserInfo(null);
  //   GoogleSignin.revokeAccess();
  //   GoogleSignin.signOut();
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>

    // <View style={styles.container}>
    //   <Text>{JSON.stringify(error)}</Text>
    //   {userInfo && <Text>{JSON.stringify(userInfo)}</Text>}
    //   {userInfo ? (
    //     <Button title="logout" onPress={logOut} />
    //   ) : (
    //     <GoogleSigninButton
    //       style={{ width: 192, height: 48 }}
    //       size={GoogleSigninButton.Size.Wide}
    //       color={GoogleSigninButton.Color.Dark}
    //       onPress={signIn}
    //     />
    //   )}
    //   <StatusBar style="auto" />
    // </View>
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
