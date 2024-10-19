import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LeagueScreen from "../screens/leagues/LeagueScreen";
import LeagueDetailsScreen from "../screens/leagues/LeagueDetailsScreen";
import CreateLeagueScreen from "../screens/leagues/CreateLeagueScreen";
import JoinLeagueScreen from "../screens/leagues/JoinLeagueScreen";
import EditLeagueScreen from "../screens/leagues/EditLeagueScreen";
import SelectPlayersScreen from "../screens/games/SelectPlayersScreen";
import NewGameScreen from "../screens/games/NewGameScreen";
import MainStatsScreen from "../screens/stats/MainStatsScreen";
import AllGamesScreen from "../screens/games/AllGamesScreen";
import CardStatsScreen from "../screens/stats/CardStatsScreen";
import PersonalStatsScreen from "../screens/stats/PersonalStatsScreen";
import EditProfileScreen from "../screens/forms/EditProfileScreen";
import AddRemovePlayers from "../screens/games/AddRemovePlayers";
import EditGameScreen from "../screens/games/EditGameScreen";
import PersonalStatsGamesList from "../screens/stats/PersonalStatsGamesList";
import HowToPlayScreen from "../screens/HowToPlayScreen";
import GlobalLeaderBoardScreen from "../screens/stats/GlobalLeaderBoardScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="Leagues"
      component={LeagueScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LeagueDetails"
      component={LeagueDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateLeague"
      component={CreateLeagueScreen}
      options={{ title: "Create A new Private League" }}
    />
    <Stack.Screen
      name="EditLeague"
      component={EditLeagueScreen}
      options={{ title: "Edit League" }}
    />
    <Stack.Screen
      name="JoinLeague"
      component={JoinLeagueScreen}
      options={{ title: "Join A Private League" }}
    />
    <Stack.Screen
      name="SelectPlayers"
      component={SelectPlayersScreen}
      options={{ title: "Select Players For The Game" }}
    />
    <Stack.Screen
      name="NewGame"
      component={NewGameScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddRemovePlayers"
      component={AddRemovePlayers}
      options={{ title: "Add/Remove Players From Game" }}
    />
    <Stack.Screen
      name="Stats"
      component={MainStatsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CardStats"
      component={CardStatsScreen}
      options={({ route }) => ({
        title: "Stats for " + (route?.params as any).data?.title,
      })}
    />

    <Stack.Screen
      name="AllGames"
      component={AllGamesScreen}
      options={{ title: "All Games" }}
    />
    <Stack.Screen
      name="PersonalStats"
      component={PersonalStatsScreen}
      options={{ title: "Personal Stats" }}
    />
    <Stack.Screen
      name="PersonalStatsGamesList"
      component={PersonalStatsGamesList}
      options={{ title: "Personal Games History" }}
    />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="EditGame" component={EditGameScreen} />
    <Stack.Screen
      name="HowToPlay"
      component={HowToPlayScreen}
      options={{ title: "How To Play" }}
    />
    <Stack.Screen
      name="GlobalLeaderBoard"
      component={GlobalLeaderBoardScreen}
      options={{ title: "Global Leaderboard" }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
