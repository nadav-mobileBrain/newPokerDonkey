import client from "./client";
import { Platform } from "react-native";

const endpoint = "/api/leagues";

function getFileExtension(filePath: string) {
  return filePath.substring(filePath.lastIndexOf("."));
}

const getLeagues = (userId: string) => {
  return client.get(`${endpoint}/myLeagues/${userId}`);
};

const createLeague = (leagueData: any) => {
  const data = new FormData();
  data.append("leagueName", leagueData.leagueName);
  data.append("userId", leagueData.userId);
  if (!leagueData.image) {
    client.headers["Content-Type"] = "multipart/form-data";

    return client.post(`${endpoint}/createLeague`, data);
  }
  const imageBlob = new Blob([leagueData.image], { type: "image/jpeg" });
  data.append(
    "image",
    imageBlob,
    leagueData.leagueName + getFileExtension(leagueData.image) /// Add the extension to the file name

    // uri:
    //   Platform.OS === 'android'
    //     ? leagueData.image
    //     : leagueData.image.replace('file://', ''),
  );
  client.headers["Content-Type"] = "multipart/form-data";

  return client.post(`${endpoint}/createLeague`, data);
};

const joinLeague = (leagueData: any) => {
  const leagueNUmber = leagueData.leagueNumber;
  const userId = leagueData.userId;
  return client.put(`${endpoint}/joinLeague/${leagueNUmber}/${userId}`);
};

const getLeaguePlayers = (leagueId: string) =>
  client.get(`${endpoint}/getLeaguePlayersByLeagueId/${leagueId}`);

const updateLeagueDetails = (leagueInfo: any) => {
  if (leagueInfo.image) {
    const data = new FormData();

    function getFileExtension(filePath: any) {
      return filePath.substring(filePath.lastIndexOf("."));
    }

    data.append("leagueName", leagueInfo.leagueName);
    data.append("leagueId", leagueInfo.leagueId);
    data.append("leaguePlayers", JSON.stringify(leagueInfo.leaguePlayers));

    // data.append("image", {
    //   name: leagueInfo.leagueName + getFileExtension(leagueInfo.image), /// Add the extension to the file name
    //   type: "image/jpeg",
    //   uri:
    //     Platform.OS === "android"
    //       ? leagueInfo.image
    //       : leagueInfo.image.replace("file://", ""),
    // });

    const imageBlob = new Blob([leagueInfo.image], { type: "image/jpeg" });
    data.append(
      "image",
      imageBlob,
      leagueInfo.leagueName + getFileExtension(leagueInfo.image) /// Add the extension to the file name
    );
    client.headers["Content-Type"] = "multipart/form-data";

    return client.put(`${endpoint}/updateLeagueDetails`, data);
  } else {
    return client.put(`${endpoint}/updateLeagueDetails`, leagueInfo);
  }
};

const deleteLeague = (leagueId: string) => {
  return client.delete(`${endpoint}/deleteLeague/${leagueId}`);
};

export default {
  getLeagues,
  createLeague,
  deleteLeague,
  joinLeague,
  getLeaguePlayers,
  updateLeagueDetails,
};
