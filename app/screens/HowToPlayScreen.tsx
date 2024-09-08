import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../components/AppText";
import AppLogo from "../components/AppLogo";
import colors from "../config/colors";
import Screen from "../components/Screen";

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <View style={styles.featureItem}>
    <MaterialCommunityIcons name={icon as any} size={24} color={colors.gold} />
    <View style={styles.featureText}>
      <AppText style={styles.featureTitle}>{title}</AppText>
      <AppText style={styles.featureDescription}>{description}</AppText>
    </View>
  </View>
);

const HowToPlayScreen = () => {
  return (
    <Screen style={styles.screen}>
      <ImageBackground
        source={require("../assets/appLogo.webp")}
        style={styles.background}
        blurRadius={4}>
        <View style={styles.overlay} />
        <ScrollView>
          <AppLogo />
          <AppText style={styles.title}>How to Use Poker Donkey</AppText>
          <AppText
            style={{
              color: colors.gold,
              fontSize: 14,
              textDecorationLine: "underline",
              textAlign: "center",
            }}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/@pokerdonkey/shorts")
            }>
            See video tutorials on my youtube channel
          </AppText>
          <AppText style={styles.subtitle}>Getting Started</AppText>
          <FeatureItem
            icon="account-plus"
            title="Create an Account"
            description="Sign up to start tracking your poker games and joining leagues."
          />

          <AppText style={styles.subtitle}>Leagues</AppText>
          <FeatureItem
            icon="plus-circle"
            title="Create a League"
            description="Start your own league and invite friends to join."
          />
          <FeatureItem
            icon="account-group"
            title="Join a League"
            description="Enter a league number to join an existing league."
          />

          <AppText style={styles.subtitle}>Tracking Games</AppText>
          <FeatureItem
            icon="poker-chip"
            title="Start a Live Game"
            description="Choose one player to be the game admin. he will enter the league screen and 'Start A New Game'.
                           game admin will select the players that will play in the game and the game will start."
          />
          <FeatureItem
            icon="cash-multiple"
            title="Record Buy-ins and Profits"
            description="Game admin should enter EVERY buy-in for every player during the game
                      and at the end of the game, record the cash-out amount."
          />

          <AppText style={styles.subtitle}>Stats and Analysis</AppText>
          <FeatureItem
            icon="chart-bar"
            title="View Player Stats"
            description="See individual stats like total profit, average profit, and success rate."
          />
          <FeatureItem
            icon="chart-line"
            title="League Statistics"
            description="Access league-wide stats including top performers and overall trends."
          />

          <AppText style={styles.subtitle}>Tips for Success</AppText>
          <AppText style={styles.tip}>
            1. Consistently track all your games for accurate stats.
          </AppText>
          <AppText style={styles.tip}>
            2. Use the app's insights to improve your poker strategy.
          </AppText>
          <AppText style={styles.tip}>
            3. Engage with your league to make the most of the social features.
          </AppText>
          <View style={styles.contact}>
            <MaterialCommunityIcons name="mail" size={24} color={colors.gold} />
            <AppText
              style={styles.mailTo}
              onPress={() =>
                Linking.openURL(
                  "mailto:nadavg1000@gmail.com?subject=Issue or Suggestion on Poker Donkey App"
                )
              }>
              Contact me for any issues or suggestions.
            </AppText>
          </View>
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  contact: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.gold,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    marginRight: 10,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gold,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.light,
  },
  mailTo: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  tip: {
    fontSize: 14,
    color: colors.gold,
    marginBottom: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.8,
  },
});

export default HowToPlayScreen;
