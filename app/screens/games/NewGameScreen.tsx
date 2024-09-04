import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import ToastContainer, { Toast } from "toastify-react-native";
import DialogComponent from "../../components/forms/DialogComponent";
import gameApi from "../../api/game";
import GameDetails from "../../components/games/GameDetails";
import GameHeader from "../../components/games/GameHeader";
import HeaderText from "../../components/HeaderText";
import ListitemSeperator from "../../components/ListitemSeperator";
import PlayerGameDetails from "../../components/games/PlayerGameDetails";
import PlayerGameCardModal from "../../components/games/PlayerGameCardModal";
import useApi from "../../hooks/useApi";
import Screen from "../../components/Screen";
import {
  onAddBuyIn,
  onRemoveBuyIn,
  checkIfAllPlayersCashedOut,
} from "../../utils/gameUtils";
import routes from "../../navigation/routes";
import getLeaguePlayers from "../../api/leagues";
import ActivityIndicator from "../../components/ActivityIndicator";
import useAuth from "../../auth/useAuth";
import logger from "../../utility/logger";

const NewGameScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const isFocused = useIsFocused(); // Add this line
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [userGamesData, setUserGamesData] = useState(route.params.userGames);
  const [error, setError] = useState<String>("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [endDialogVisible, setEndDialogVisible] = useState(false);
  const [moneyLeft, setMoneyLeft] = useState(0);
  const getLeaguePlayersApi = useApi(getLeaguePlayers.getLeaguePlayers);
  const [game, setGame] = useState(route.params.game);

  const league = route.params.league;
  const endGameApi = useApi(gameApi.endGame);
  const takeControllOfGameApi = useApi(gameApi.takeControllOfGame);
  const { user } = useAuth();

  useEffect(() => {
    if (isFocused) {
      setUserGamesData(route.params.userGames);
    }
  }, [isFocused]);

  const moneyLeftInBank = () => {
    if (moneyLeft != 0) {
      const isAllCashedOut = checkIfAllPlayersCashedOut(userGamesData);
      if (!isAllCashedOut) {
        Toast.error("All Players must cash out", "top");
        // alert('All Players must cash out');
        return;
      }
      setEndDialogVisible(true);
      return;
    }
    setEndDialogVisible(false);
    endGame();
  };

  const endGame = async () => {
    const isAllCashedOut = checkIfAllPlayersCashedOut(userGamesData);
    if (!isAllCashedOut) {
      Toast.warn("All Players must cash out", "top");
      //alert('All Players must cash out');
      return;
    }
    setEndDialogVisible(false);
    const result = await endGameApi.request(game.id, userGamesData, league);
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
    navigation.navigate(routes.STATS, { league });
  };

  const addRemovePlayersFromGame = async () => {
    setLoading(true);
    const result = await getLeaguePlayersApi.request(league.id);
    if (!result.ok) {
      setLoading(false);
      return;
    }
    setLoading(false);
    const leaguePlayers = (result.data as any)?.leaguePlayers;

    navigation.navigate(routes.ADD_REMOVE_PLAYERS, {
      leaguePlayersFromApi: leaguePlayers,
      league,
    });
  };

  const takeControllOfGame = () => {
    setDialogVisible(true); // Show the dialog when the button is pressed
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const replaceGameAdmin = await takeControllOfGameApi.request(
      game.id,
      user?.userId
    );
    if (!replaceGameAdmin.ok) {
      if (replaceGameAdmin.data) setError((replaceGameAdmin.data as any).error);
      else {
        setError("An unexpected error occurred.");
        logger.log(replaceGameAdmin);
      }
      return;
    }
    setGame((replaceGameAdmin.data as any).updatedGame);
    setDialogVisible(false);
    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="top" />
      <ActivityIndicator visible={!isFocused} />
      <Screen style={styles.container}>
        <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}>
          <HeaderText>New Game</HeaderText>
          {dialogVisible && (
            <DialogComponent
              titleText="Take Control of Game"
              descriptionText="Do you want to take control of the game and replace the game
              admin?"
              handleCancel={handleCancel}
              handleConfirm={handleConfirm}
            />
          )}
          {endDialogVisible && (
            <DialogComponent
              titleText="Money in the bank is not zero"
              descriptionText="Are you sure you want to end game?"
              handleCancel={() => setEndDialogVisible(false)}
              handleConfirm={() => endGame()}
            />
          )}
          {error && <AppText style={{ color: colors.danger }}>{error}</AppText>}
          <ActivityIndicator visible={loading} />
          <GameDetails
            game={game}
            league={league}
            userGameData={userGamesData}
            onCalculateMoneyInTheBank={(moneyLeft: number) => {
              setMoneyLeft(moneyLeft);
            }}
          />
          {game?.gameManager?.id === user?.userId && (
            <TouchableOpacity onPress={addRemovePlayersFromGame}>
              <AppText style={styles.addRemoveButton}>
                +Add/Remove players from game
              </AppText>
            </TouchableOpacity>
          )}
          {game?.gameManager?.id != user?.userId && (
            <View>
              <AppText style={styles.noAdmin}>
                Only the game manager can control game's data
              </AppText>
              <AppText style={styles.addRemove} onPress={takeControllOfGame}>
                Take control of the game and replace game admin?
              </AppText>
            </View>
          )}
          {game?.gameManager?.id === user?.userId && (
            <>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={userGamesData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                    item.User ? (
                      <PlayerGameDetails
                        image={item.User.image}
                        nickName={item.User.nickName}
                        playerData={item}
                        onPress={() => {
                          setModalVisible(true);
                          setSelectedPlayer(item);
                        }}
                        contentContainerStyle={styles.flatListContent}
                      />
                    ) : null
                  }
                  ItemSeparatorComponent={ListitemSeperator}
                  ListHeaderComponent={() => (
                    <GameHeader />
                    // <GameHeader userGamesData={userGamesData} />
                  )}
                />
              </View>
              <AppButton
                title="End Game"
                color="gold"
                onPress={() => moneyLeftInBank()}
              />
              <Modal visible={modalVisible} animationType="slide">
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Screen>
                  {selectedPlayer && (
                    <PlayerGameCardModal
                      playerData={selectedPlayer}
                      onClose={() => setModalVisible(false)}
                      onAddBuyIn={(amount: number, userId: string) => {
                        onAddBuyIn(
                          amount,
                          userId,
                          userGamesData,
                          setUserGamesData
                        );
                        Toast.success(
                          `${amount} added for ${selectedPlayer?.User?.nickName}`,
                          "top"
                        );
                      }}
                      onRemoveBuyIn={(amount: number, userId: string) => {
                        onRemoveBuyIn(
                          amount,
                          userId,
                          userGamesData,
                          setUserGamesData
                        );
                        Toast.success(
                          `${amount} removed for ${selectedPlayer?.User?.nickName}`,
                          "top"
                        );
                      }}
                      onCashOut={(amount: number, userId: string) => {
                        const updatedUserGames = [...userGamesData];
                        const playerIndex = updatedUserGames.findIndex(
                          (p) => p.user_id === userId
                        );
                        updatedUserGames[playerIndex].cash_out_amount = amount;
                        updatedUserGames[playerIndex].is_cashed_out = true;

                        setUserGamesData(updatedUserGames);
                        Toast.success(
                          ` ${selectedPlayer?.User?.nickName} cashed out ${amount}`,
                          "top"
                        );
                      }}
                    />
                  )}
                </Screen>
              </Modal>
            </>
          )}
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
  button: {
    color: colors.gold,
    fontSize: 33,
  },
  addRemove: {
    color: colors.gold,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    textDecorationLine: "underline",
  },
  addRemoveButton: {
    color: colors.blue,
    backgroundColor: colors.gold,
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  noAdmin: {
    color: colors.danger,
    backgroundColor: colors.gold,
    textAlign: "center",
    fontSize: 13,
    paddingVertical: 10,
  },
  flatListContainer: {
    borderBottomLeftRadius: 15, // Added this line
    borderBottomRightRadius: 15, // Added this line
    overflow: "hidden", // Ensure the FlatList items respect the border radius
    backgroundColor: colors.white, // Match the FlatList background to the container
    maxHeight: 350, // Adjust the height as needed
    flexGrow: 0,
    marginBottom: 5,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default NewGameScreen;
