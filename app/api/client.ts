import settings from "../config/settings";

import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  // baseURL: `http://${homeIp}:3030/`,
  baseURL: settings.baseURL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  if (request.headers) {
    request.headers["x-auth-token"] = authToken;
  }
});

export default apiClient;
