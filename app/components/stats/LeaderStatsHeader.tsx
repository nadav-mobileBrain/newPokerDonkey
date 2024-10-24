import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigationRef } from "../../navigation/rootNavigation";

import colors from "../../config/colors";
import config from "../../config/config";
import routes from "../../navigation/routes";

interface LeaderStatsHeaderProps {
  leader: {
    id: number;
    image: string;
    nickName: string;
    title: string;
    subTitle: string;
    subTitle2: string;
  };
  titles: {
    cardTitle: string;
    subTitle: string;
    subTitle2: string;
  };
}

const { width } = Dimensions.get("window");

const LeaderStatsHeader = ({ leader, titles }: LeaderStatsHeaderProps) => {
  return (
    <ImageBackground
      source={require("../../assets/cardstats.webp")}
      style={styles.headerContainer}
      imageStyle={[styles.backgroundImage, { opacity: 0.9 }]}>
      <View style={styles.overlay} />
      <TouchableOpacity
        style={styles.imageContainer}
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
        <View style={styles.crown}>
          <MaterialCommunityIcons name="crown" size={24} color={colors.gold} />
        </View>
      </TouchableOpacity>
      <Text style={styles.leaderName}>1. {leader.nickName}</Text>
      <View style={styles.statsContainer}>
        <StatItem title={titles.cardTitle} value={leader.title} icon="trophy" />
        <StatItem
          title={titles.subTitle}
          value={leader.subTitle}
          icon="chart-line"
        />
        <StatItem
          title={titles.subTitle2}
          value={leader.subTitle2}
          icon="cash"
        />
      </View>
    </ImageBackground>
  );
};

interface StatItemProps {
  title: string;
  value: string;
  icon: string;
}

const StatItem = ({ title, value, icon }: StatItemProps) => (
  <View style={styles.statItem}>
    <MaterialCommunityIcons name={icon as any} size={20} color={colors.gold} />
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    opacity: 0.7,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 10,
  },
  leaderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.gold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.dark,
    opacity: 0.8,
  },
  crown: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 5,
  },
  leaderName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statTitle: {
    fontSize: 12,
    color: colors.light,
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gold,
  },
});

export default LeaderStatsHeader;
