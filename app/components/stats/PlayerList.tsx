import React from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { navigationRef } from "../../navigation/rootNavigation";
import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import ListitemSeperator from "../ListitemSeperator";
import routes from "../../navigation/routes";

const PlayerItem = ({ player, index, title }: any) => {
  return (
    <View style={styles.itemContainer}>
      <AppText style={styles.position}>{index}</AppText>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          navigationRef?.current?.navigate(routes.PERSONAL_STATS, {
            userDetails: player,
          })
        }>
        <Image
          source={{
            uri: player?.image?.startsWith("https")
              ? player.image
              : `${config.s3.baseUrl}${player.image}`,
          }}
          style={styles.playerImage}
        />
        <Text style={styles.playerName}>{player.nickName}</Text>
      </TouchableOpacity>
      <View style={styles.playerDetails}>
        <Text
          style={[
            styles.playerStats,
            player.title > 0 &&
              title === "totalProfit" && { color: "green", fontWeight: "bold" },
            player.title < 0 &&
              title === "totalProfit" && {
                color: "red",
                fontWeight: "bold",
              },
          ]}>
          {player.title}
        </Text>
        <Text style={styles.playerStats}> {player.subTitle}</Text>
        <Text style={styles.playerStats}> {player.subTitle2}</Text>
      </View>
    </View>
  );
};

const PlayersList = ({ players, titles }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <AppText style={styles.playerTitle}>Player</AppText>
        <AppText style={styles.title}>{titles.cardTitle}</AppText>
        <AppText style={styles.title}>{titles.subTitle}</AppText>
        <AppText style={styles.title}>{titles.subTitle2}</AppText>
      </View>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <PlayerItem player={item} index={index + 2} title={titles.apiRoute} />
        )}
        keyExtractor={(item) => `${item.id}_${item.title}_${item.subTitle}`}
        ItemSeparatorComponent={ListitemSeperator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: colors.purple,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 70,
  },

  playerImage: {
    width: 35,
    height: 35,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  playerDetails: {
    justifyContent: "space-around",
    flexDirection: "row-reverse",
    flex: 1,
  },
  playerName: {
    fontSize: 8,
    color: colors.purple,
  },
  playerStats: {
    fontSize: 12,
    width: 60,
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
  },
  position: {
    fontSize: 10,
    width: 16,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 10,
    width: 45,
    color: colors.gold,
  },
  playerTitle: {
    fontSize: 10,
    width: 50,
    color: colors.gold,
  },
});

export default PlayersList;
