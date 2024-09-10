import React, { useState, useEffect } from "react";
import { View, StyleSheet, Switch } from "react-native";
import Screen from "../../components/Screen";
import HeaderText from "../../components/HeaderText";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import AppLogo from "../../components/AppLogo";
import AppButton from "../../components/AppButton";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import useNotifications from "../../hooks/useNotifications";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = (props: any) => {
  const navigation = useNavigation();
  const userId = props.route.params.user.userId;
  const checkNotificationApi = useApi(usersApi.checkNotification);
  const updateNotificationSettingsApi = useApi(
    usersApi.updateNotificationSettings
  );

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    checkUsersNotificationSettings(userId);
  }, []);

  const checkUsersNotificationSettings = async (userId: string) => {
    const result = await checkNotificationApi.request(userId);
    if (!result.ok) {
      return;
    }
    const message = (result.data as any).message;
    if (message == "User has a token") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  // This function will be called when the user toggles the switch
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const updateNotificationSettings = async () => {
    const result = await updateNotificationSettingsApi.request(
      userId,
      isEnabled
    );
    if (!result.ok) {
      console.log("Error updating notification settings");
      return;
    }
    const message = (result.data as any).message;
    if (message == "User doesn't have a token") {
      useNotifications();
    }
    navigation.goBack();
  };

  useNotifications((notificationListener: any) => {
    console.log("Notification received", notificationListener);
  });

  return (
    <Screen>
      <View style={styles.container}>
        <AppLogo />
        <HeaderText style={styles.title}>Notifications</HeaderText>

        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "black", true: "white" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {isEnabled ? (
          <AppText style={styles.comment}>
            Notifications are currently enabled.
          </AppText>
        ) : (
          <AppText style={styles.comment}>
            Notifications are currently disabled.
          </AppText>
        )}
        <AppButton
          title="Save Selection"
          color="gold"
          onPress={() => updateNotificationSettings()}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.blue,
  },
  comment: {
    color: colors.gold,
    textAlign: "center",
    fontSize: 16,
  },
  title: {
    color: "gold",
  },
  switchContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    height: 50,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
    color: colors.gold,
  },
});

export default NotificationsScreen;
