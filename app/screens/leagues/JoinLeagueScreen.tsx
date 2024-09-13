import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppFormField from "../../components/forms/AppFormField";
import { AppForm } from "../../components/forms";
import colors from "../../config/colors";
import ErrorMessage from "../../components/forms/ErrorMessage";
import HeaderText from "../../components/HeaderText";
import leaguesApi from "../../api/leagues";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import logger from "../../utility/logger";

const validationSchema = Yup.object().shape({
  leagueNumber: Yup.string().required().min(4).max(5).label("League Number"),
});

const JoinLeagueScreen = ({ navigation }: { navigation: any }) => {
  const [error, setError] = useState<String>("");
  const { user } = useAuth();

  const handleSubmit = async ({ leagueNumber }: { leagueNumber: string }) => {
    const completeLeagueInfo = {
      leagueNumber,
      userId: user?.userId,
    };
    const result = await leaguesApi.joinLeague(completeLeagueInfo);
    if (result.status === 404) {
      setError((result.data as any)?.message);
      return;
    }
    if (!result.ok) {
      if ((result.data as any).message) setError((result.data as any).message);
      if ((result.data as any).error) setError((result.data as any).error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }

    navigation.navigate(routes.LEAGUE_DETAILS, {
      item: result.data,
      data: result.data,
    });
  };
  return (
    <>
      <ActivityIndicator />
      <Screen style={styles.container}>
        <ImageBackground
          blurRadius={4}
          style={styles.background}
          source={require("../../assets/newLogo.webp")}>
          <View style={styles.overlay} />
          <HeaderText style={{ color: colors.gold }}>Join a League</HeaderText>
          <AppText style={{ color: colors.gold }}>
            Enter the League Number to join a league
          </AppText>
          <AppText style={styles.remark}>
            *Get the number from league members
          </AppText>
          <AppForm
            initialValues={{ leagueNumber: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField
              name="leagueNumber"
              placeholder="League Number"
              icon="account"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
            />
            <SubmitButton
              title="Join League"
              icon="plus-circle-outline"
              color="gold"
            />
          </AppForm>
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.8,
  },
  remark: {
    color: colors.gold,
  },
});
export default JoinLeagueScreen;
