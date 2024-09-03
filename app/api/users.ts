import client from "./client";
// import { Platform } from "react-native";
import { ApiResponse } from "apisauce";

const endpoint = "api/users";

interface UserInfo {
  idToken: string;
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string | null;
}

const googleSignin = (userInfo: UserInfo): Promise<ApiResponse<any>> => {
  return client.post(`${endpoint}/googleSignin`, userInfo);
};

const checkNotification = (userId: String) => {
  return client.get(`${endpoint}/checkNotification/${userId}`);
};

const updateNotificationSettings = (userId: String, isEnabled: Boolean) => {
  return client.put(`${endpoint}/updateNotificationSettings/${userId}`, {
    isEnabled,
  });
};

// const register = (userInfo) => {
//   if (userInfo.image) {
//     const data = new FormData();
//     function getFileExtension(filePath) {
//       return filePath.substring(filePath.lastIndexOf("."));
//     }

//     data.append("nickName", userInfo.nickName);
//   //  data.append("password", userInfo.password);
//     data.append("image", {
//       name: userInfo.nickName + getFileExtension(userInfo.image), /// Add the extension to the file name
//       type: "image/jpeg",
//       uri:
//         Platform.OS === "android"
//           ? userInfo.image
//           : userInfo.image.replace("file://", ""),
//     });
//     client.headers["Content-Type"] = "multipart/form-data";

//     return client.post(`${endpoint}/signup`, data);
//   } else {
//     return client.post(`${endpoint}/signup`, userInfo);
//   }
// };

interface UserInfo {
  nickName: string;
  userId: string;
  image: string;
}

const updatePersonaldetails = (userInfo: UserInfo) => {
  if (userInfo.image) {
    const data = new FormData();

    function getFileExtension(filePath: string) {
      return filePath.substring(filePath.lastIndexOf("."));
    }

    data.append("nickName", userInfo.nickName);
    data.append("userId", userInfo.userId);

    const imageBlob = new Blob([userInfo.image], { type: "image/jpeg" });
    data.append(
      "image",
      imageBlob,
      userInfo.nickName + getFileExtension(userInfo.image)
    );
    client.headers["Content-Type"] = "multipart/form-data";

    return client.put(`${endpoint}/updatePersonaldetails`, data);
  } else {
    return client.put(`${endpoint}/updatePersonaldetails`, userInfo);
  }
};

const updateExpoPushToken = (userId: string, expoPushToken: string) => {
  return client.put(`${endpoint}/updateExpoPushToken/${userId}`, {
    expoPushToken,
  });
};

const getPersonalStats = (userId: string) => {
  return client.get(`${endpoint}/personalStats/${userId}`);
};

const deleteAccount = (userId: string) => {
  return client.delete(`${endpoint}/deleteAccount/${userId}`);
};

export default {
  // register,
  getPersonalStats,
  updatePersonaldetails,
  updateExpoPushToken,
  googleSignin,
  checkNotification,
  updateNotificationSettings,
  deleteAccount,
};
