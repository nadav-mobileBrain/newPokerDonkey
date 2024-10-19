import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import logger from "../utility/logger";
const key = "authToken";

const storeToken = async (authToken: any) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async (): Promise<any | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("🚀 ~ getToken ~ error:", error);
    logger.log(error);
    return null;
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    logger.log(error);
    console.log("🚀 ~ removeToken ~ error:", error);
  }
};

export default { getUser, getToken, removeToken, storeToken };
