import client from "./client";

const endpoint = "/api/stats";

const getLeagueStats = (leagueId: string) =>
  client.get(`${endpoint}/getLeagueStats/${leagueId}`);

const getPlayerStats = (leagueId: string) =>
  client.get(`${endpoint}/getPlayersStats/${leagueId}`);

const getMainCardsStats = (leagueId: string) =>
  client.get(`${endpoint}/getMainCardsStats/${leagueId}`);

const getStatsForCard = (cardName: string, leagueId: string) =>
  client.get(`${endpoint}/${cardName}/${leagueId}`);

export default {
  getLeagueStats,
  getPlayerStats,
  getMainCardsStats,
  getStatsForCard,
};
