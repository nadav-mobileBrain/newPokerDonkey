import client from "./client";

interface UserInfo {
  googleId: string;
}

const login = (userInfo: UserInfo): Promise<any> => {
  client.headers["Content-Type"] = "application/json";
  return client.post("api/users/login", userInfo);
};

export default {
  login,
};
