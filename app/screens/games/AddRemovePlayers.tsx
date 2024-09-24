import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";
import PlayerInfo from "../../components/player/PlayerInfo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import gameApi from "../../api/game";
import useApi from "../../hooks/useApi";
import routes from "../../navigation/routes";
import logger from "../../utility/logger";
import { useAptabase } from "../../hooks/useAptabase";

const AddRemovePlayers = ({ route, navigation }: any) => {
  const { trackEvent } = useAptabase();

  const leaguePlayers = route.params.leaguePlayersFromApi;
  const league = route.params.league;

  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [unselectedPlayers, setUnselectedPlayers] = useState<any[]>([]);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);
  const updateGamePlayers = useApi(gameApi.addREmovePlayersFromGame);
  const [gameData, setGameData] = useState<Object>({});
  const [error, setError] = useState<String>();

  useEffect(() => {
    const checkIfOpenGames = async () => {
      const result = await checkIfOpenGameExist.request(league.id);
      if (result.ok) {
        if (result.data) {
          setGameData(result.data);
          setSelectedPlayers((result.data as any).userGames);
          setUnselectedPlayers(
            leaguePlayers.filter(
              (p: any) =>
                !(result.data as any).userGames.some(
                  (p2: any) => p2.User.id === p.User.id
                )
            )
          );
        }
      }
    };
    checkIfOpenGames();
    trackEvent("Add Remove Players Screen", { screen: "Add Remove Players" });
  }, []);

  const continueGame = async () => {
    const gameId = (gameData as any).game.id;
    const leagueId = league.id;

    const result = await updateGamePlayers.request(
      gameId,
      selectedPlayers,
      leagueId
    );
    const updatedGameData = result.data;

    if (!result.ok) {
      if (result.data) {
        setError((result.data as any).error);
        logger.log(result.data);
      } else {
        setError("An unexpected error occurred.");
        logger.log(result.problem);
      }
      return;
    }

    navigation.navigate(routes.NEW_GAME as any, {
      game: (gameData as any).game,
      gameDetails: (updatedGameData as any).updatedGameDetails,
      league,
      userGames: (updatedGameData as any).updatedUserGames,
    });
  };
  const onSelectedPlayer = (player: any) => {
    const playerIndex = selectedPlayers.findIndex(
      (p: any) => p.id === player.id
    );
    if (playerIndex === -1) {
      setSelectedPlayers([...selectedPlayers, player]);
      setUnselectedPlayers(
        unselectedPlayers.filter((p: any) => p.id !== player.id)
      );
    } else {
      const updatedPlayers = [...selectedPlayers];
      updatedPlayers.splice(playerIndex, 1);
      setSelectedPlayers(updatedPlayers);
      setUnselectedPlayers([...unselectedPlayers, player]);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.selectContainer}>
        {error && <AppText>{error}</AppText>}
        <HeaderText>Add/Remove Players</HeaderText>
        <AppText style={styles.addRemove}>
          *Press on a player to add to the game
        </AppText>
        <PlayerInfo
          leaguePlayers={unselectedPlayers}
          onPress={onSelectedPlayer}
          width={40}
          height={40}
        />

        {selectedPlayers.length > 0 && (
          <View style={styles.selectedPlayersContainer}>
            <AppText style={styles.inTheGame}> In The Game </AppText>
            <AppText style={styles.addRemove}>
              *Press on a player to remove from the game
            </AppText>
            <AppText>{selectedPlayers.length} Players</AppText>
            <PlayerInfo
              leaguePlayers={selectedPlayers}
              onPress={onSelectedPlayer}
              width={40}
              height={40}
              borderColor="LimeGreen"
            />
          </View>
        )}

        <AppButton
          title="Return To Game"
          color="blue"
          icon="cards-playing-club-multiple-outline"
          onPress={() => continueGame()}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  addRemove: {
    fontSize: 10,
  },
  container: {
    backgroundColor: colors.light,
  },
  inTheGame: {
    color: colors.green,
    fontSize: 30,
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 20,
    height: 250,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
  },
  selectedPlayersContainer: {
    padding: 10,
    justifyContent: "center",
  },
  selectContainer: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
  },
});

export default AddRemovePlayers;
