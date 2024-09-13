import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import dayjs from "dayjs";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import AppLogo from "../../components/AppLogo";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import gameApi from "../../api/game";
import getLeaguePlayers from "../../api/leagues";
import HowToPlay from "../../components/HowToPlay";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import PlayerInfo from "../../components/player/PlayerInfo";
import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import useApi from "../../hooks/useApi";
import { useAptabase } from "../../hooks/useAptabase";

const LeagueDetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const league = route.params.item.league;
  const [leaguePlayers, setLeaguePlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLiveGameOn, setIsLiveGameOn] = useState(false);
  const getLeaguePlayersApi = useApi(getLeaguePlayers.getLeaguePlayers);
  const checkIfOpenGameExist = useApi(gameApi.checkIfOpenGameExist);
  const insets = useSafeAreaInsets();
  const { trackEvent } = useAptabase();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const playersResult = await getLeaguePlayersApi.request(league.id);
      const gameResult = await checkIfOpenGameExist.request(league.id);

      if (playersResult.ok) {
        setLeaguePlayers((playersResult?.data as any)?.leaguePlayers);
      }
      if (gameResult.ok && gameResult.data) {
        setIsLiveGameOn(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderContent = () => (
    <View style={styles.playerContainer}>
      <Image
        style={styles.image}
        source={{ uri: `${config.s3.baseUrl}${league.league_image}` }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.leagueInfo}>
          League Name: {league.league_name}
        </AppText>
        <AppText style={styles.leagueInfo}>
          League Number: {league.league_number}
        </AppText>
        <AppText style={styles.leagueInfo}>
          Admin: {league.leagueAdmin?.nickName}
        </AppText>
        {league?.league_name !== "demo league" && (
          <AppText
            style={styles.editLeague}
            onPress={() =>
              navigation.navigate(routes.EDIT_LEAGUE, {
                league,
                leaguePlayers,
              })
            }>
            Edit league details
          </AppText>
        )}
        <HowToPlay navigation={navigation} align="center" />
      </View>

      <PlayerInfo leaguePlayers={leaguePlayers} width={35} height={35} />
      <View style={styles.buttonContainer}>
        <AppButton
          title="League Stats"
          icon="chart-box-outline"
          color="gold"
          onPress={() => {
            trackEvent("League Stats Viewed", {
              leagueId: league.id,
              leagueName: league.league_name,
            });
            navigation.navigate(routes.STATS, { league });
          }}
        />
        <AppButton
          title={isLiveGameOn ? "Join Live Game" : "Start A New Game"}
          color="secondary"
          icon="cards-playing-spade-multiple-outline"
          onPress={() => {
            trackEvent("New Game StartScreen", {
              leagueId: league.id,
              leagueName: league.league_name,
            });
            navigation.navigate(routes.SELECT_PLAYERS, {
              leaguePlayers,
              league,
            });
          }}
        />
      </View>
      <AppText style={styles.created}>
        Created At: {dayjs(league?.created_at).format("DD/MM/YYYY")}
      </AppText>
    </View>
  );

  return (
    <>
      <ActivityIndicator visible={getLeaguePlayersApi.loading || loading} />
      <Screen style={styles.container}>
        <ImageBackground
          blurRadius={6}
          style={styles.background}
          source={require("../../assets/appLogo.webp")}>
          <View style={styles.overlay} />
          <FlatList
            data={[{ key: "dummy" }]}
            renderItem={() => null}
            ListHeaderComponent={
              <>
                <PlayerAvatar />
                <AppLogo />
              </>
            }
            ListFooterComponent={renderContent}
            contentContainerStyle={[
              styles.contentContainer,
              { paddingBottom: insets.bottom + 10 },
            ]}
          />
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://buymeacoffee.com/nadavg1000m")
            }>
            <AppText style={styles.developerText}>
              Developed By Nadav Galili 🧙‍♂️
            </AppText>
            <AppText style={styles.buyMeCoffe}>Buy Me A Coffee ☕️</AppText>
          </TouchableOpacity>
        </ImageBackground>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  buyMeCoffe: {
    color: colors.gold,
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  editLeague: {
    color: colors.blue,
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.5,
  },
  playerContainer: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  developerText: {
    color: colors.gold,
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  detailsContainer: {
    padding: 10,
    gap: 2,
  },
  leagueInfo: {
    fontSize: 13,
    color: colors.dark,
    textAlign: "center",
  },

  buttonContainer: {
    paddingHorizontal: 10,
  },
  created: {
    padding: 10,
    textAlign: "right",
    fontSize: 9,
    color: colors.medium,
  },
});

export default LeagueDetailsScreen;
