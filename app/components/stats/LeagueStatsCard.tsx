import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
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
        <AppText
          style={styles.leagueName}
          numberOfLines={1}
          ellipsizeMode="tail">
          {league.league_name}
        </AppText>
        <AppText style={styles.number} numberOfLines={1} ellipsizeMode="tail">
          League No.: {league.league_number}
        </AppText>
      </View>
      <View style={styles.statsContainer}>
        <StatItem
          label="Total Cash Played"
          value={`${leagueStats?.totalCashPlayed ?? 0} $`}
        />
        <StatItem label="Total Hours Played" value={leagueStats?.totalHours} />
        <StatItem label="Total Games" value={leagueStats?.gamesCount} />
        <StatItem
          label="Last Game"
          value={leagueStats?.lastGame?.created_at ?? "N/A"}
        />
        <StatItem
          label="Avg Buy Ins Per Game"
          value={leagueStats?.avgTotalBuyInsPerGameForLeague ?? 0}
          small
        />
      </View>
    </Pressable>
  );
};

const StatItem = ({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string | number;
  small?: boolean;
}) => (
  <View style={styles.statItem}>
    <AppText
      style={[styles.statLabel, ...(small ? [styles.small] : [])]}
      numberOfLines={1}
      ellipsizeMode="tail">
      {label}:
    </AppText>
    <AppText
      style={[styles.statValue, ...(small ? [styles.small] : [])]}
      numberOfLines={1}
      ellipsizeMode="tail">
      {value}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: colors.gold,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  leagueName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  number: {
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
  statsContainer: {
    flex: 2,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
  },
  statValue: {
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  small: {
    fontSize: 10,
  },
});

export default LeagueStatsCard;
