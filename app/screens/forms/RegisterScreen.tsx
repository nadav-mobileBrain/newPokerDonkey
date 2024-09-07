import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";

import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import AppLogo from "../../components/AppLogo";
import ActivityIndicator from "../../components/ActivityIndicator";
import authApi from "../../api/auth";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import colors from "../../config/colors";
import logger from "../../utility/logger";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";

const RegisterScreen = () => {
  const signinWithGoogleApi = useApi(usersApi.googleSignin);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  const localWebClient =
    "642539761997-uu7qdgioieccn89baa9v8tkhc84r0nbu.apps.googleusercontent.com";
  const googleWebClientId =
    "642539761997-mjob5qps6oodjiq52uj7noa805seisde.apps.googleusercontent.com";
  const configureGoogleSignin = async () => {
    GoogleSignin.configure({
      webClientId: googleWebClientId || localWebClient,
    });
  };
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("🚀 ~ signIn ~ userInfo:", userInfo);
      setUserInfo(userInfo);
      setError(null);

      const result = await signinWithGoogleApi.request(userInfo);

      if (!result.ok) {
        if (result.data) {
          setError((result.data as any).error);
          logger.log(result.data);
        } else {
          setError("An unexpected error occurred.");
          logger.log(result);
        }
        return;
      }

      const user = (result?.data as any)?.user;

      const { data: authToken } = await loginApi.request(user);

      auth.logIn(authToken as any);
    } catch (e) {
      console.log("🚀 ~ signIn ~ e:", e);
      setError("An unexpected error occurred");
      logger.log(e);
    }
  };

  return (
    <>
      <ActivityIndicator
        visible={signinWithGoogleApi.loading || loginApi.loading}
      />
      <Screen style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../../assets/appLogo.webp")}
          blurRadius={10}>
          <View style={styles.overlay} />
          <AppLogo />
          <AppText style={styles.comment}>
            *You can add/change your image and name later
          </AppText>
          {error && (
            <AppText style={{ color: "red" }}>{JSON.stringify(error)}</AppText>
          )}
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            style={styles.googleButton}
          />
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comment: {
    color: colors.gold,
    fontSize: 20,
    margin: 20,
    alignSelf: "center",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  googleButton: {
    width: "80%",
    height: 60,
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.3,
  },
});

export default RegisterScreen;
