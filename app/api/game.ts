import client from "./client";

const endpoint = "/api/games";

interface NewGameParams {
  selectedPlayers: any; // An array of Player objects
  leagueId: string; // Assuming leagueId is a string
  gameAdminId: string; // Assuming gameAdminId is a string
}

const newGame = ({ selectedPlayers, leagueId, gameAdminId }: NewGameParams) => {
  return client.post(`${endpoint}/newGame`, {
    selectedPlayers,
    leagueId,
    gameAdminId,
  });
};

const addBuyIn = (
  gameId: string,
  playerId: string,
  buyInAmount: number,
  leagueId: string
) => {
  return client.post(`${endpoint}/addBuyInToPlayer`, {
    gameId,
    playerId,
    buyInAmount,
    leagueId,
  });
};

const removeLastBuyIn = (
  gameId: string,
  playerId: string,
  buyInAmount: number,
  leagueId: string
) => {
  return client.post(`${endpoint}/removeLastBuyInToPlayer`, {
    gameId,
    playerId,
    buyInAmount,
    leagueId,
  });
};

const cashOutPlayer = (
  gameId: string,
  userId: string,
  cashOutAmount: number
) => {
  return client.put(`${endpoint}/cashOutPlayer`, {
    gameId,
    userId,
    cashOutAmount,
  });
};

const endGame = (gameId: string, userGamesData: any, league: any) => {
  return client.put(`${endpoint}/endGame`, { gameId, userGamesData, league });
};

const getAllGamesForLeague = (leagueId: string, continuationToken = 0) => {
  // Include the continuationToken in the API request
  // Default the continuationToken to 0 to get the first page if not provided
  return client.get(
    `${endpoint}/getAllGamesForLeague?leagueId=${leagueId}&continuationToken=${continuationToken}`
  );
};

const checkIfOpenGameExist = (leagueId: string) => {
  return client.get(`${endpoint}/checkIfOpenGameExist?leagueId=${leagueId}`);
};

const addREmovePlayersFromGame = (
  gameId: string,
  selectedPlayers: any,
  leagueId: string
) => {
  return client.put(`${endpoint}/addRemovePlayersFromGame`, {
    gameId,
    selectedPlayers,
    leagueId,
  });
};

const takeControllOfGame = (gameId: string, newAdminId: string) => {
  return client.put(`${endpoint}/takeControllOfGame`, {
    gameId,
    newAdminId,
  });
};

const deleteGame = (gameId: string) => {
  return client.delete(`${endpoint}/deleteGame`, {
    gameId,
  });
};

const updateGameDetails = (
  gameId: string,
  gameDetails: any,
  editorId: string
) => {
  return client.put(`${endpoint}/updateGameDetails`, {
    gameId,
    gameDetails,
    editorId,
  });
};

export default {
  newGame,
  addBuyIn,
  cashOutPlayer,
  endGame,
  removeLastBuyIn,
  getAllGamesForLeague,
  checkIfOpenGameExist,
  addREmovePlayersFromGame,
  takeControllOfGame,
  deleteGame,
  updateGameDetails,
};
