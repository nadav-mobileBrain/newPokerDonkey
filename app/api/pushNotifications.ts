import client from "./client";

const endpoint = "/api/pushNotifications";

const test = (expoPushToken: string) => {
  return client.post(`${endpoint}/test`, { expoPushToken });
};

const leaguePush = (leagueId: string, message: any) => {
  return client.post(`${endpoint}/leaguePush/${leagueId}`, { message });
};

export default {
  test,
  leaguePush,
};
