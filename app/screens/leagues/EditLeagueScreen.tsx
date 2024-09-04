import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import config from "../../config/config";
import colors from "../../config/colors";
import DialogComponent from "../../components/forms/DialogComponent";
import ErrorMessage from "../../components/forms/ErrorMessage";
import ImageInput from "../../components/forms/ImageInput";
import Icon from "../../components/Icon";
import leagueApi from "../../api/leagues";
import logger from "../../utility/logger";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  leagueName: Yup.string().required().label("League Name"),
  image: Yup.string().label("Image"),
});
const EditLeagueScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const leagueName = route.params?.league?.league_name;
  const leagueImage = route.params?.league?.league_image;
  const leagueId = route.params?.league?.id;
  const league = route.params?.league;
  const [dialogVisible, setDialogVisible] = useState(false);

  const [leaguePlayers, setLeaguePlayers] = useState(
    route.params?.leaguePlayers.filter(
      (player: any) => player.User.id !== league.admin_id
    )
  );
  const leagueAdminId = route.params?.league?.admin_id;
  const { user } = useAuth();

  const updateLeagueDetailsApi = useApi(leagueApi.updateLeagueDetails);
  const deleteLeagueApi = useApi(leagueApi.deleteLeague);

  const [error, setError] = useState<string>("");
  const [imageUri, setImageUri] = useState(
    `${config.s3.baseUrl}${leagueImage}`
  );

  const handleSubmit = async (leagueInfo: any) => {
    const completeLeagueInfo = {
      ...leagueInfo,
      image: imageUri,
      leagueId,
      leaguePlayers,
    };

    const result = await updateLeagueDetailsApi.request(completeLeagueInfo);
    console.log("🚀 ~ handleSubmit ~ result:", result.data);
    if (!result.ok) {
      if (result.data) {
        setError((result.data as any).error);
        logger.log(result);
      } else {
        setError("An unexpected error occurred.");
        logger.log(result.originalError);
      }
      return;
    }

    navigation.navigate(routes.LEAGUES);
    navigation.navigate(routes.LEAGUE_DETAILS, { item: result.data });
  };

  const deletePlayers = (player: any) => {
    setLeaguePlayers((prevPlayers: any) =>
      prevPlayers.filter((p: any) => p.User.id !== player.User.id)
    );
  };

  const deleteLeague = async (leagueId: string) => {
    setDialogVisible(false);
    const result = await deleteLeagueApi.request(leagueId);
    if (!result.ok) {
      if (result.data) setError((result.data as any).error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }
    navigation.navigate(routes.LEAGUES);
  };

  return (
    <>
      <ActivityIndicator visible={updateLeagueDetailsApi.loading} />
      <Screen style={styles.container}>
        <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}>
          <AppForm
            initialValues={{ leagueName: leagueName }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField
              autoCorrect={false}
              icon="account-group"
              name="leagueName"
              placeholder={leagueName}
              //    style={styles.input}
            />

            <View>
              <ImageInput
                imageUri={imageUri}
                onChangeImage={(uri) => setImageUri(uri)}
              />
            </View>
            {user?.userId === leagueAdminId && (
              <View>
                <AppText style={styles.removePlayersText}>
                  Remove players from league
                </AppText>
                <FlatList
                  data={leaguePlayers}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.playerContainer}
                      onPress={() => deletePlayers(item)}>
                      <Image
                        source={{
                          uri: item.User.image.startsWith("https")
                            ? item.User.image
                            : `${config.s3.baseUrl}${item.User.image}`,
                        }}
                        style={styles.image}
                      />
                      <AppText style={styles.playerName}>
                        {item.User.nickName}
                      </AppText>
                      <Icon
                        name="trash-can"
                        backgroundColor="red"
                        size={25}
                        iconColor="white"
                      />
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.deleteLeague}
                  onPress={() => setDialogVisible(true)}>
                  <AppText style={styles.deleteLeagueText}>
                    Delete League
                  </AppText>
                  <Icon name="trash-can" backgroundColor="red" size={25} />
                </TouchableOpacity>
                {dialogVisible && (
                  <DialogComponent
                    titleText="Delete League"
                    descriptionText="Are you sure you want to delete this league? This cannot be undone."
                    handleConfirm={() => deleteLeague(leagueId)}
                    handleCancel={() => setDialogVisible(false)}
                  />
                )}
              </View>
            )}
            <SubmitButton
              title="Edit Details"
              icon="account-edit"
              color="gold"
            />
          </AppForm>
        </LinearGradient>
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
  deleteLeague: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flexDirection: "row-reverse",
  },
  deleteLeagueText: {
    color: colors.white,
    fontSize: 13,
    padding: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  playerContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  playerName: {
    color: colors.gold,
    fontSize: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  removePlayersText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default EditLeagueScreen;
