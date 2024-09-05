import { useEffect } from "react";

import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

import users from "../api/users";
import useAuth from "../auth/useAuth";
import navigation from "../navigation/rootNavigation";

const useNotifications = (notificationListener: any = "") => {
  const { user } = useAuth();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener((notificationListener) => {
      const league = notificationListener?.request?.content?.data;

      // if (league) {
      //     navigation.navigate('AllGames', { league });
      // }
      //  console.log("🚀 ~ data:", notificationListener?.request?.content?.data);
    });
  }, []);

  const handleRegistrationError = (errorMessage: string) => {
    alert(errorMessage);
    throw new Error(errorMessage);
  };
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted to get push token for push notification!"
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) {
        handleRegistrationError("Project ID not found");
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;

        if (!user) return;
        if (user?.userId) {
          users.updateExpoPushToken(user.userId, pushTokenString);
        }
        return pushTokenString;
      } catch (e) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError(
        "Must use physical device for push notifications"
      );
    }
  };
};

export default useNotifications;
