import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import AppSmallIconButton from "../../components/forms/AppSmallIconButton";
import config from "../../config/config";
import Card from "../../components/Card";
import CreatejoinLeagues from "../../components/leagues/CreateJoinLeagues";
import colors from "../../config/colors";
import HeaderText from "../../components/HeaderText";
import leaguesApi from "../../api/leagues";
import NoLeagues from "../../components/leagues/NoLeagues";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import HowToPlay from "../../components/HowToPlay";
import { useAptabase } from "../../hooks/useAptabase";

const LeagueScreen = ({ navigation }: { navigation: any }) => {
  const { trackEvent } = useAptabase();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  const [leagues, setLeagues] = useState<{ leagues: any[] }>({ leagues: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLeagues, setSelectedLeagues] = useState(null);
  const { user } = useAuth();
  const [isAdLoading, setIsAdLoading] = useState(true);

  const ANDROID_INTERSTITIAL_AD_UNIT_ID: string =
    "ca-app-pub-4169403957560964/4331129928";
  let adUnitId =
    Platform.select({
      android: ANDROID_INTERSTITIAL_AD_UNIT_ID,
      // ios: "ca-app-pub-2640391750032066/9067118729",
    }) || ANDROID_INTERSTITIAL_AD_UNIT_ID;

  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    __DEV__ ? TestIds.INTERSTITIAL : adUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    }
  );

  const loadAd = useCallback(() => {
    setIsAdLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    loadAd();
  }, [loadAd]);

  useEffect(() => {
    if (isLoaded) {
      setIsAdLoading(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isClosed && selectedItem && selectedLeagues) {
      navigation.navigate(routes.LEAGUE_DETAILS, {
        item: selectedItem,
        data: selectedLeagues,
      });
      setSelectedItem(null);
      setSelectedLeagues(null);
      loadAd();
    }
  }, [isClosed, selectedItem, selectedLeagues, navigation, loadAd]);

  useEffect(() => {
    if (isFocused) {
      fetchLeagues();
    }
    trackEvent("League Screen", { screen: "League" });
  }, [isFocused]);

  const fetchLeagues = async () => {
    const userLeagues = await getLeaguesApi.request(user?.userId);
    if (!userLeagues.ok) {
      return;
    }
    setLeagues((userLeagues as any)?.data);
  };

  const handleCardPress = (item: any, leagues: any) => {
    setSelectedItem(item);
    setSelectedLeagues(leagues);

    if (isLoaded) {
      show();
      trackEvent("Interstitial Ad Loaded", { userId: user?.userId });
    } else {
      trackEvent("Interstitial Ad not loaded", { userId: user?.userId });
      trackEvent("League Card Pressed", { userId: user?.userId });
      navigation.navigate(routes.LEAGUE_DETAILS, {
        item,
        data: leagues,
      });
      loadAd();
    }
  };

  //const isLoading = getLeaguesApi.loading || isAdLoading;
  // const isLoading = isAdLoading ?? false;
  return (
    <>
      <ActivityIndicator visible={getLeaguesApi.loading} />
      <Screen style={styles.screen}>
        <ImageBackground
          style={styles.background}
          blurRadius={5}
          source={require("../../assets/appLogo.webp")}>
          <View style={styles.overlay} />
          <PlayerAvatar />
          <AppLogo />
          <HowToPlay navigation={navigation} />
          <AppSmallIconButton
            title="Global Leaderboard"
            icon="trophy"
            color="gold"
            onPress={() => {
              trackEvent("Global Leaderboard Pressed", {
                userId: user?.userId,
              });
              navigation.navigate("GlobalLeaderBoard");
            }}
          />
          <HeaderText style={styles.headerText}>My Leagues</HeaderText>
          {getLeaguesApi.error && (
            <>
              <AppText style={styles.errorText}>
                Couldn't retrieve the leagues.
              </AppText>
              <AppButton title="Retry" onPress={getLeaguesApi.request} />
            </>
          )}

          {leagues?.leagues?.length === 0 && (
            <NoLeagues navigation={navigation} />
          )}

          {leagues?.leagues?.length > 0 && (
            <CreatejoinLeagues navigation={navigation} />
          )}

          {leagues?.leagues?.length > 0 && (
            <FlatList
              data={leagues.leagues}
              keyExtractor={(league) => league.id.toString()}
              renderItem={({ item }) => (
                <Card
                  title={item.league.league_name}
                  subTitle={`League Number: ${item.league.league_number}`}
                  imageUrl={`${config.s3.baseUrl}${item.league.league_image}`}
                  onPress={() => handleCardPress(item, leagues)}
                />
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchLeagues();
                setRefreshing(false);
              }}
            />
          )}
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  allApps: {
    color: colors.gold,
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
  },
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.7,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.gold,
    fontFamily: "Roboto_700Bold",
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Roboto_400Regular",
  },
});

export default LeagueScreen;
