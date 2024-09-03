import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
// import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
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

const LeagueScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const getLeaguesApi = useApi(leaguesApi.getLeagues);
  const [leagues, setLeagues] = useState<{ leagues: any[] }>({ leagues: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLeagues, setSelectedLeagues] = useState(null);
  const { user } = useAuth();
  //const [isAdLoading, setIsAdLoading] = useState(true);

  //   let adUnitId = Platform.select({
  //     android: "ca-app-pub-2640391750032066/5726639519",
  //     ios: "ca-app-pub-2640391750032066/9067118729",
  //   });

  //   const { isLoaded, isClosed, load, show } = useInterstitialAd(
  //     __DEV__ ? TestIds.INTERSTITIAL : adUnitId,
  //     {
  //       requestNonPersonalizedAdsOnly: true,
  //     }
  //   );

  //   const loadAd = useCallback(() => {
  //    // setIsAdLoading(true);
  //    // load();
  //   }, [load]);

  //   useEffect(() => {
  //     loadAd();
  //   }, [loadAd]);

  //   useEffect(() => {
  //     if (isLoaded) {
  //       setIsAdLoading(false);
  //     }
  //   }, [isLoaded]);

  //   useEffect(() => {
  //     if (isClosed && selectedItem && selectedLeagues) {
  //       navigation.navigate(routes.LEAGUE_DETAILS, {
  //         item: selectedItem,
  //         data: selectedLeagues,
  //       });
  //       setSelectedItem(null);
  //       setSelectedLeagues(null);
  //       loadAd();
  //     }
  //   }, [isClosed, selectedItem, selectedLeagues, navigation, loadAd]);

  useEffect(() => {
    if (isFocused) {
      fetchLeagues();
    }
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
    navigation.navigate(routes.LEAGUE_DETAILS, {
      item,
      data: leagues,
    });

    // if (isLoaded) {
    //   show();
    // } else {
    //   navigation.navigate(routes.LEAGUE_DETAILS, {
    //     item,
    //     data: leagues,
    //   });
    //   loadAd();
    // }
  };

  //   const isLoading = getLeaguesApi.loading || isAdLoading;
  const isLoading = getLeaguesApi.loading ?? false;

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Screen style={styles.screen}>
        <ImageBackground
          style={styles.background}
          blurRadius={5}
          source={require("../../assets/appLogo.webp")}>
          <View style={styles.overlay} />
          <PlayerAvatar />
          <AppLogo />

          <HowToPlay navigation={navigation} />
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
    opacity: 0.45,
  },

  headerText: {
    fontSize: 30,
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
