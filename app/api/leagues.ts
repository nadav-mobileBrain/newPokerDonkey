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

interface LeaguePlayer {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
  league_id: number;
  user_id: number;
}

interface LeagueInfo {
  image?: string;
  leagueName: string;
  leagueId: string;
  leaguePlayers: LeaguePlayer[] | null;
}

const updateLeagueDetails = async (leagueInfo: LeagueInfo) => {
  const data = new FormData();

  data.append("leagueName", leagueInfo.leagueName);
  data.append("leagueId", leagueInfo.leagueId.toString());
  data.append("leaguePlayers", JSON.stringify(leagueInfo.leaguePlayers));

  if (
    leagueInfo.image &&
    leagueInfo.image !==
      "https://backend-donk-images.s3.il-central-1.amazonaws.com/leagueAvatars/league.jpg"
  ) {
    const imageUri =
      Platform.OS === "android"
        ? leagueInfo.image
        : leagueInfo.image.replace("file://", "");
    const imageName = imageUri.split("/").pop() || "image.jpg";

    data.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: imageName,
    } as any);
  }

  console.log("FormData:", data);

  return client.put(`${endpoint}/updateLeagueDetails`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
