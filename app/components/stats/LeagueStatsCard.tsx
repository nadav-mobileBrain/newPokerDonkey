import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import useApi from "../../hooks/useApi";
import statsApi from "../../api/stats";
import config from "../../config/config";
import { Toast } from "toastify-react-native";
import { useAptabase } from "../../hooks/useAptabase";

const LeagueStatsCard = ({ league }: any) => {
  const getLeagueStatsApi = useApi(statsApi.getLeagueStats);
  const [leagueStats, setLeagueStats] = useState<any>([]);
  const { trackEvent } = useAptabase();
  const getLeagueStats = async () => {
    const result = await getLeagueStatsApi.request(league.id);
    if (!result.ok) return;
    if ((result.data as any[]).length === 0) return;

    setLeagueStats(result.data as never[]);
  };

  useEffect(() => {
    getLeagueStats();
  }, []);

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        trackEvent("Pressed On League Stats Card");
        Toast.success("Coming soon...");
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${config.s3.baseUrl}${league.league_image}` }}
          style={styles.image}
        />
        <AppText>{league.league_name}</AppText>
        <AppText style={styles.number}>
          League Number:{league.league_number}
        </AppText>
      </View>
      <View>
        <Text style={styles.stat}>
          Total Cash Played: {leagueStats?.totalCashPlayed} $
        </Text>
        <Text style={styles.stat}>
          Total Hours Played: {leagueStats?.totalHours}
        </Text>
        <Text style={styles.stat}>Total Games: {leagueStats?.gamesCount}</Text>
        <Text style={styles.stat}>
          Last Game: {leagueStats?.lastGame?.created_at}
        </Text>
        <Text style={styles.small}>
          Avg Buy Ins Per Game : {leagueStats?.avgTotalBuyInsPerGameForLeague}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.gold,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
    padding: 8,
  },

  number: {
    fontSize: 12,
  },
  stat: {
    fontSize: 12,
    fontFamily: "Roboto_700Bold",
  },
  small: {
    fontSize: 10,
    fontFamily: "Roboto_700Bold",
  },
});

export default LeagueStatsCard;
