import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { navigationRef } from "../../navigation/rootNavigation";

import colors from "../../config/colors";
import config from "../../config/config";
import routes from "../../navigation/routes";

interface LeaderStatsHeaderProps {
  leader: any;
  titles: {
    cardTitle: string;
    subTitle: string;
    subTitle2: string;
  };
}

const LeaderStatsHeader = ({ leader, titles }: LeaderStatsHeaderProps) => {
  return (
    <ImageBackground
      source={require("../../assets/cardstats.webp")}
      style={styles.headerContainer}>
      <View style={styles.overlay} />
      <TouchableOpacity
        onPress={() =>
          navigationRef?.current?.navigate(routes.PERSONAL_STATS, {
            userDetails: leader,
          })
        }>
        <Image
          source={{
            uri: leader?.image?.startsWith("https")
              ? leader.image
              : `${config.s3.baseUrl}${leader.image}`,
          }}
          style={styles.leaderImage}
        />
      </TouchableOpacity>
      <Text style={styles.leaderName}>{leader.nickName}</Text>
      <Text style={styles.leaderStats}>
        {titles.cardTitle} :{leader.title}
      </Text>
      <Text style={styles.leaderStats}>
        {" "}
        {titles.subTitle}: {leader.subTitle}
      </Text>
      <Text style={styles.leaderStats}>
        {titles.subTitle2}: {leader.subTitle2}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    padding: 5,
  },
  leaderImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  leaderName: {
    fontSize: 20,
    color: colors.secondary,
  },
  leaderStats: {
    fontSize: 16,
    color: colors.gold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.65,
  },
});

export default LeaderStatsHeader;
