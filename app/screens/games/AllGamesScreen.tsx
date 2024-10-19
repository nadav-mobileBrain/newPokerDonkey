import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  ListRenderItem,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Container from "toastify-react-native";

import ActivityIndicator from "../../components/ActivityIndicator";
import AllGamesCard from "../../components/games/AllGamesCard";
import AppLogo from "../../components/AppLogo";
import colors from "../../config/colors";
import gameApi from "../../api/game";
import HeaderText from "../../components/HeaderText";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import { useAptabase } from "../../hooks/useAptabase";

const AllGamesScreen = ({
  route,
  leagueIdForPushNotifications = null,
}: {
  route: any;
  leagueIdForPushNotifications?: string | null;
}) => {
  const isFocused = useIsFocused();
  const { trackEvent } = useAptabase();

  const leagueId = route.params.league.id;
  const league = route.params.league;
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [continuationToken, setContinuationToken] = useState<string | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const getAllGamesForLeagueApi = useApi(gameApi.getAllGamesForLeague);
  const flatListRef = useRef<FlatList>(null);

  const fetchGames = useCallback(
    async (token: string | null) => {
      if (isLoading) return;

      setIsLoading(true);
      const result = await getAllGamesForLeagueApi.request(
        leagueId,
        token,
        3 // Pass the number of games to fetch
      );
      if (!result.ok) {
        setError("Failed to load games");
        setIsLoading(false);
        return;
      }

      const newGames = (result.data as any).games || [];
      setGames((prevGames) => [...prevGames, ...newGames]);

      const newToken = (result.data as any).nextContinuationToken;
      setContinuationToken(newToken || null);

      setIsLoading(false);
      console.log("Fetched games:", newGames.length, "New token:", newToken);
    },
    [leagueId, getAllGamesForLeagueApi, isLoading]
  );

  useEffect(() => {
    if (isFocused && isInitialLoad) {
      setGames([]);
      fetchGames(null);
      setIsInitialLoad(false);
    }
  }, [isFocused, isInitialLoad, fetchGames]);

  useEffect(() => {
    if (isFocused) {
      trackEvent("All Games Screen", { screen: "All Games" });
    }
  }, [isFocused, trackEvent]);

  const handleLoadMore = () => {
    console.log(
      "handleLoadMore called. isLoading:",
      isLoading,
      "continuationToken:",
      continuationToken
    );
    if (!isLoading && continuationToken) {
      fetchGames(continuationToken);
    }
  };

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => <AllGamesCard game={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const screenHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if user has scrolled to the bottom (minus a threshold)
    const threshold = 20; // Adjust this value as needed
    if (offsetY + screenHeight >= contentHeight - threshold) {
      console.log("Near bottom, triggering load more");
      handleLoadMore();
    }
  };

  return (
    <>
      <ActivityIndicator visible={getAllGamesForLeagueApi.loading} />
      <Container
        position="top"
        height={120}
        duration={2000}
        textStyle={{ fontSize: 20 }}
      />
      <Screen style={styles.container}>
        <ImageBackground
          blurRadius={4}
          style={styles.background}
          source={require("../../assets/cardstats.webp")}>
          <View style={styles.overlay} />
          <AppLogo />
          {games.length === 0 && !isLoading ? (
            <Text style={styles.noGames}>
              Only games that have been played will be shown here. Start a game
              to see stats.
            </Text>
          ) : null}
          <HeaderText style={{ color: colors.gold }}>
            {league?.league_name}
          </HeaderText>
          <FlatList
            ref={flatListRef}
            data={games}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListFooterComponent={() =>
              isLoading ? <ActivityIndicator visible={true} /> : null
            }
            onScroll={handleScroll}
            scrollEventThrottle={16} // Adjust for performance
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            windowSize={21}
          />
          {error ? <Text style={styles.errorText}>Error: {error}</Text> : null}
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
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.5,
  },
  gameText: {
    fontSize: 16,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 100,
  },
  noGames: {
    fontSize: 15,
    color: colors.gold,
    textAlign: "center",
    marginVertical: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default AllGamesScreen;
