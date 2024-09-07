import client from "./client";

interface UserInfo {
  email: string;
  expoPushToken?: string;
  familyName: string;
  givenName: string;
  google_id: string;
  id: number;
  nickName?: string;
  created_at?: string;
  is_active?: boolean;
  last_login?: string;
  token?: string;
  updated_at?: string;
}

const login = (userInfo: UserInfo): Promise<any> => {
  client.headers["Content-Type"] = "application/json";
  return client.post("api/users/login", userInfo);
};

export default {
  login,
};
