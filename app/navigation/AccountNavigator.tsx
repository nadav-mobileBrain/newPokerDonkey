import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
// import MessagesScreen from "../screens/MessagesScreen";
import EditProfileScreen from "../screens/forms/EditProfileScreen";
import NotificationsScreen from "../screens/forms/NotificationsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="AccountHome" component={AccountScreen} />
    {/* // <Stack.Screen name="Messages" component={MessagesScreen} /> */}
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
