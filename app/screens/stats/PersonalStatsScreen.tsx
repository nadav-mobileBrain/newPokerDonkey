import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import AppText from "../../components/AppText";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import config from "../../config/config";
import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";
import usersApi from "../../api/users";
import { useAptabase } from "../../hooks/useAptabase";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

type RootStackParamList = {
  PersonalStatsGamesList: {
    personalStats: any;
  };
};

type MainStatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PersonalStatsGamesList"
>;

const StatItem = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.statItem}>
    <AppText style={styles.statTitle}>{title}</AppText>
    <AppText style={styles.statValue}>{value}</AppText>
  </View>
);

const StatsSection = ({
  title,
  stats,
}: {
  title: string;
  stats: { title: string; value: string }[];
}) => (
  <>
    <AppText style={styles.name}>{title}</AppText>
    <View>
      {stats.map(({ title, value }) => (
        <StatItem key={title} title={title} value={value} />
      ))}
    </View>
  </>
);

const PersonalStatsScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<MainStatsScreenNavigationProp>();
  const { user: authUser } = useAuth();
  const user = route?.params?.userDetails || authUser;
  const userId = user.id || user.userId;
  const { trackEvent } = useAptabase();

  const imageUrl = user.image.includes("http")
    ? user.image
    : `${config.s3.baseUrl}${user.image}`;

  const getPersonalStatsApi = useApi(usersApi.getPersonalStats);
  const [personalStats, setPersonalStats] = useState<any>(null);

  useEffect(() => {
    const fetchPersonalStats = async () => {
      const result = await getPersonalStatsApi.request(userId);
      if (result.ok) {
        setPersonalStats(result.data as any);
      } else {
        console.error("Failed to fetch personal stats:", result.problem);
      }
    };

    fetchPersonalStats();
  }, [userId]);

  const renderTotalStats = () => {
    if (!personalStats?.totalStats) return null;
    const stats = [
      { title: "Total Games", value: personalStats.totalStats[0].totalGames },
      { title: "Total Profit", value: personalStats.totalStats[0].totalProfit },
      {
        title: "Total Hours",
        value: personalStats.totalStats[0].totalHoursPlayed,
      },
      {
        title: "Total Buy In",
        value: personalStats.totalStats[0].totalBuyInsAmount,
      },
      {
        title: "Current Win Streak",
        value: personalStats.streaksData[0].title,
      },
      { title: "Max Win Streak", value: personalStats.streaksData[0].subTitle },
      {
        title: "Total Games With Profit",
        value: personalStats.totalStats[0].gamesWithProfit,
      },
      {
        title: "Success Rate %",
        value: personalStats.totalStats[0].successRate,
      },
      { title: "Max Win", value: personalStats.totalStats[0].maxProfit },
      { title: "Max Loss", value: personalStats.totalStats[0].minProfit },
      {
        title: "Best League Rank",
        value: personalStats.totalStats[0].maxSeasonRank,
      },
    ];
    return <StatsSection title="Total Stats" stats={stats} />;
  };

  const renderAvgStats = () => {
    if (!personalStats?.avgStats) return null;
    const stats = [
      { title: "Avg Profit", value: personalStats.avgStats[0].avgProfit },
      {
        title: "Avg Buy Ins",
        value: personalStats.avgStats[0].avgBuyInsAmount,
      },
      {
        title: "Avg Cash In Hand",
        value: personalStats.avgStats[0].avgCashInHand,
      },
      {
        title: "Avg Hours Played",
        value: personalStats.avgStats[0].avgHoursPlayed,
      },
      { title: "Avg Game Rank", value: personalStats.avgStats[0].avgGameRank },
      {
        title: "Avg Season Rank",
        value: personalStats.avgStats[0].avgSeasonRank,
      },
    ];
    return <StatsSection title="Average Stats" stats={stats} />;
  };

  return (
    <>
      <ActivityIndicator visible={getPersonalStatsApi.loading} />
      <Screen>
        <ImageBackground
          source={require("../../assets/personalDonkey.webp")}
          style={styles.background}
          blurRadius={5}>
          <View style={styles.overlay} />
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
          <AppText style={styles.name}>{user.nickName}</AppText>

          {!personalStats?.games?.length ? (
            <View style={styles.noGamesContainer}>
              <AppText style={styles.noGames}>No Games Played Yet</AppText>
              <AppText style={styles.noGames}>
                Play a game to see your stats
              </AppText>
            </View>
          ) : (
            <>
              {renderTotalStats()}
              {renderAvgStats()}

              <AppButton
                title="Games History"
                color="gold"
                icon="view-list-outline"
                onPress={() => {
                  trackEvent("Personal Stats Games History Viewed", {
                    userId,
                  });
                  navigation.navigate(routes.PERSONAL_STATS_GAMES_LIST, {
                    personalStats,
                  });
                }}
              />
            </>
          )}
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
  },

  imageContainer: {
    width: 40,
    height: 40,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    // marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 5,
  },
  noGamesContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  noGames: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 5,
  },

  statItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  statTitle: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  statValue: {
    color: colors.white,
    fontSize: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.55,
  },
});

export default PersonalStatsScreen;
