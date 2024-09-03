import logger from "../utility/logger";
import { Toast } from "toastify-react-native";

export const removeLastBuyIn = async (
  buyInNumber: number,
  buyInAmount: number,
  removeLastBuyInToPlayer: any,
  playerData: any,
  setBuyInAmount: any,
  setBuyInNumber: any,
  onRemoveBuyIn: any,
  onClose: any
) => {
  if (buyInNumber < 1) {
    Toast.error("No buy ins to remove", "top");
    alert("No buy ins to remove");
    return;
  }
  const result = await removeLastBuyInToPlayer.request(
    playerData.game_id,
    playerData.user_id,
    -50,
    playerData.league_id
  );

  if (!result.ok) {
    logger.log(result.data);
    return;
  }
  setBuyInAmount(buyInAmount - result.data[1]);
  setBuyInNumber(buyInNumber - 1);
  onRemoveBuyIn(result.data[1], playerData.user_id);
  // Call the callback function to close the modal
  onClose();
};

export const addBuyIn = async (
  amount: number,
  setBuyInAmount: any,
  setBuyInNumber: any,
  addBuyInToPlayer: any,
  playerData: any,
  onAddBuyIn: any,
  buyInAmount: number,
  buyInNumber: number,
  onClose: any
) => {
  setBuyInAmount(buyInAmount + amount);
  setBuyInNumber(buyInNumber + 1);
  const result = await addBuyInToPlayer.request(
    playerData.game_id,
    playerData.user_id,
    amount,
    playerData.league_id
  );
  if (!result.ok) {
    logger.log(result.data);
    return;
  }
  onAddBuyIn(amount, playerData.user_id);
  // Call the callback function to close the modal
  onClose();
};

export const onAddBuyIn = (
  amount: number,
  userId: string,
  userGamesData: any,
  setUserGamesData: any
) => {
  const updatedUserGames = [...userGamesData];
  const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
  updatedUserGames[playerIndex].buy_ins_amount += amount;
  updatedUserGames[playerIndex].buy_ins_number += 1;
  setUserGamesData(updatedUserGames);
};

export const onRemoveBuyIn = (
  amount: number,
  userId: string,
  userGamesData: any,
  setUserGamesData: any
) => {
  const updatedUserGames = [...userGamesData];
  const playerIndex = updatedUserGames.findIndex((p) => p.user_id === userId);
  updatedUserGames[playerIndex].buy_ins_amount -= amount;
  updatedUserGames[playerIndex].buy_ins_number -= 1;
  setUserGamesData(updatedUserGames);
};

export const checkIfAllPlayersCashedOut = (userGamesData: any) => {
  const allPlayersCashedOut = userGamesData.every((player: any) => {
    return player.is_cashed_out === true;
  });

  return allPlayersCashedOut;
};
