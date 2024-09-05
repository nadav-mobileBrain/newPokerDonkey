import client from "./client";
import { Platform } from "react-native";

const endpoint = "api/users";

interface UserInfo {
  data: {
    idToken: string;
    user: {
      email: string;
      id: string;
      givenName: string;
      familyName: string;
      photo: string | null;
      google_id: string;
    };
  };
}

const googleSignin = (userInfo: UserInfo) => {
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

const getTestUserDetails = () => {
  return client.get(`${endpoint}/testUserDetails`);
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
  image?: string;
  nickName: string;
  userId: string;
}

interface ImageData {
  name: string;
  type: string;
  uri: string;
}

const updatePersonaldetails = (userInfo: UserInfo) => {
  if (userInfo.image) {
    const data = new FormData();

    function getFileExtension(filePath: string): string {
      return filePath.substring(filePath.lastIndexOf("."));
    }

    data.append("nickName", userInfo.nickName);
    data.append("userId", userInfo.userId);

    const imageData: ImageData = {
      name: userInfo.nickName + getFileExtension(userInfo.image),
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? userInfo.image
          : userInfo.image.replace("file://", ""),
    };

    data.append("image", imageData as any);
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
  getTestUserDetails,
};
