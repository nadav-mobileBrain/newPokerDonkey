import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useAptabase } from "../../hooks/useAptabase";
import ActivityIndicator from "../ActivityIndicator";
import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import LeagueStatsCard from "./LeagueStatsCard";
import HeaderText from "../HeaderText";
import PlayerDetails from "../player/PlayerDetails";
import statsApi from "../../api/stats";
import useApi from "../../hooks/useApi";
import routes from "../../navigation/routes";

type RootStackParamList = {
  CardStats: {
    data: any; // Replace 'any' with a more specific type if possible
    leagueId: string;
  };
};

// Define the navigation prop type
type PlayerStatsCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CardStats"
>;

interface PlayerStatsCardProps {
  league: {
    id: string; // Assuming league has an id property of type string
    // Add other properties as needed
  };
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ league }) => {
  const getCardsInfo = useApi(statsApi.getMainCardsStats);
  const [cardsData, setCardsData] = useState<any[]>([]); // Assuming cardsData is an array
  const [loading, setLoading] = useState(false);
  const [noGames, setNoGames] = useState(false);
  const navigation = useNavigation<PlayerStatsCardNavigationProp>();
  const { trackEvent } = useAptabase();

  const getCardsInfoApi = async () => {
    setLoading(true);
    const result = await getCardsInfo.request(league.id);
    if (!result.ok) {
      setLoading(false);
      if (result.data === "No games found") {
        setNoGames(true);
      }
      return;
    }
    setCardsData(result.data as never);
    setLoading(false);
  };

  useEffect(() => {
    getCardsInfoApi();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />

      {noGames && (
        <>
          <HeaderText style={{ color: colors.gold }}>
            No games played yet
          </HeaderText>
          <AppText style={{ color: colors.gold }}>
            Go to league screen to start a new game
          </AppText>
        </>
      )}
      {cardsData.length > 0 && (
        <FlatList
          data={cardsData}
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item }) => {
            if (!item || !item.values) {
              return <AppText>No data available</AppText>;
            }
            return (
              <PlayerDetails
                title={item.title}
                subTitle={item.subTitle}
                image={{
                  uri: item?.values?.image.startsWith("https")
                    ? item?.values?.image
                    : `${config.s3.baseUrl}${item?.values?.image}`,
                }}
                onPress={() => {
                  trackEvent("Player Stats Card Pressed", {
                    cardTitle: item.title,
                    leagueId: league.id,
                  });
                  navigation.navigate("CardStats", {
                    data: item,
                    leagueId: league.id,
                  });
                }}
              />
            );
          }}
          ListHeaderComponent={<LeagueStatsCard league={league} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlayerStatsCard;
