import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import dayjs from "dayjs";

import ActivityIndicator from "../../components/ActivityIndicator";
import AllGamesCardHeader from "../../components/games/AllGamesCardHeader";
import AllGamesPlayersEditForm from "../../components/games/AllGamesPlayersEditForm";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import DialogComponent from "../../components/forms/DialogComponent";
import gamesApi from "../../api/game";
import HeaderText from "../../components/HeaderText";
import Icon from "../../components/Icon";
import ListitemSeperator from "../../components/ListitemSeperator";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";

type RootStackParamList = {
  Stats: {
    league: any;
  };
  AllGames: {
    league: any;
  };
};

type EditGameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Stats"
>;

const EditGameScreen = ({ route }: { route: any }) => {
  const game = route.params;
  const editorId = route.params.user.userId;
  const navigation = useNavigation<EditGameScreenNavigationProp>();
  const [players, setPlayers] = useState(game.gameDetails.user_games);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const deleteGameApi = useApi(gamesApi.deleteGame);
  const updateGameDetailsApi = useApi(gamesApi.updateGameDetails);

  const handlePlayerUpdate = (userId: string, field: any, value: any) => {
    setPlayers((prevPlayers: any) =>
      prevPlayers.map((player: any) =>
        player.user_id === userId ? { ...player, [field]: value } : player
      )
    );
  };

  const handleSave = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = async () => {
    const result = await updateGameDetailsApi.request(
      game.gameDetails.id,
      players,
      editorId
    );
    if (!result.ok) {
      console.log("Error:", result.data);
      return;
    }
    const updatedGame = result.data as any;
    if (updatedGame.status === 1) {
      navigation.navigate("Stats", { league: updatedGame.league });
      navigation.navigate("AllGames", { league: updatedGame.league });
    }
    setDialogVisible(false);
  };

  const deleteGame = async (game: any) => {
    const result = await deleteGameApi.request(game.gameDetails.id);
    if (!result.ok) {
      console.log("Error:", result.data);
      return;
    }
    const deletedGameMessage = (result.data as any).message;
    if (deletedGameMessage === "Game deleted successfully") {
      navigation.navigate("Stats", { league: (result.data as any).league });
      navigation.navigate("AllGames", { league: (result.data as any).league });
    }
  };

  const renderHeader = () => (
    <>
      <HeaderText style={{ color: colors.secondary }}>
        Edit Game Details
      </HeaderText>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => setDeleteDialog(true)}>
        <AppText style={{ color: colors.danger, paddingStart: 10 }}>
          Delete Game
        </AppText>
        <Icon
          name="trash-can"
          size={30}
          backgroundColor={colors.danger}
          iconColor={colors.white}
        />
      </TouchableOpacity>
      <View>
        <AppText style={styles.gameDetails}>
          {dayjs(game.gameDetails.created_at).format("DD/MM/YYYY")}
        </AppText>
        <AppText style={styles.gameDetails}>
          {dayjs(game.gameDetails.created_at).format("HH:mm")}-
          {dayjs(game.gameDetails.updated_at).format("HH:mm")}
        </AppText>
        <AppText style={styles.gameManager}>
          Game Manager: {game?.gameDetails?.game_manager?.nickName}
        </AppText>
      </View>
      <AllGamesCardHeader />
    </>
  );

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator
        visible={deleteGameApi.loading || updateGameDetailsApi.loading}
      />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={players}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={({ item }) => (
            <AllGamesPlayersEditForm
              player={item}
              onUpdate={handlePlayerUpdate}
            />
          )}
          ItemSeparatorComponent={ListitemSeperator}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.buttonContainer}>
          <AppButton title="Save Changes" onPress={handleSave} color="gold" />
        </View>
      </View>
      {deleteDialog && (
        <DialogComponent
          handleCancel={() => setDeleteDialog(false)}
          handleConfirm={() => deleteGame(game)}
          titleText="Delete this game?"
          descriptionText="This can't be undone"
        />
      )}
      {dialogVisible && (
        <DialogComponent
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          titleText="Save Changes?"
          descriptionText="Are you sure you want to save the changes?"
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    maxHeight: "100%", // Adjust the height as needed
    flexGrow: 0,
    backgroundColor: colors.purple,
  },
  listContent: {
    padding: 10,
    paddingBottom: 80, // Ensure space for the button
  },
  buttonContainer: {
    padding: 10,
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  gameDetails: {
    width: "100%",
    textAlign: "center",
    padding: 5,
    color: colors.light,
    height: 30,
  },
  gameManager: {
    width: "100%",
    textAlign: "center",
    color: colors.light,
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.5,
  },
});

export default EditGameScreen;
