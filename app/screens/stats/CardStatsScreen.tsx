import { StyleSheet, View, Platform, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Screen from "../../components/Screen";
import LeaderStatsHeader from "../../components/stats/LeaderStatsHeader";
import PlayersList from "../../components/stats/PlayerList";

import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import ActivityIndicator from "../../components/ActivityIndicator";
import {
  TestIds,
  BannerAdSize,
  BannerAd,
} from "react-native-google-mobile-ads";

const CardStatsScreen = ({ route }: { route: any }) => {
  const [cardPlayers, setCardPlayers] = useState([]);
  const [leader, setLeader] = useState({});
  const [loading, setLoading] = useState(false);
  const { data, leagueId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const apiRoute = data.apiRoute;
  const getStats = useApi(statsApi.getStatsForCard);

  const ANDROID_BANNER_AD_UNIT_ID: string =
    "ca-app-pub-4169403957560964/6511442845";
  //   const IOS_AD_UNIT_ID = "ca-app-pub-2640391750032066/5726635947";

  const adUnitId =
    Platform.select({
      // ios: IOS_AD_UNIT_ID,
      android: ANDROID_BANNER_AD_UNIT_ID,
    }) || ANDROID_BANNER_AD_UNIT_ID;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getStatsForCard();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [leader, cardPlayers]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getStatsForCard();
    setRefreshing(false);
  };

  interface Leader {
    id: number;
    image: string;
    nickName: string;
    title: string;
    subTitle: string;
    subTitle2: string;
  }

  const getStatsForCard = async () => {
    setLoading(true);
    const result = await getStats.request(apiRoute, leagueId);
    if (!result.ok) return;
    ///get the first element of the array
    const leader = (result?.data as Leader[])[0];

    setLeader(leader);
    (result.data as any).shift();

    setCardPlayers(result.data as any);
    setLoading(false);
  };

  return (
    <Screen style={styles.screen}>
      <ActivityIndicator visible={loading} />
      <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
        <LeaderStatsHeader leader={leader as Leader} titles={data} />
        <PlayersList players={cardPlayers} titles={data} />
      </Animated.View>
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={__DEV__ ? TestIds.BANNER : adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CardStatsScreen;
