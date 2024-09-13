import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";
import config from "../../config/config";
import AppText from "../AppText";
import { useAptabase } from "../../hooks/useAptabase";

const PlayerAvatar = () => {
  const { user } = useAuth();
  const { trackEvent } = useAptabase();
  let url = user?.image;
  //if url is not a full url, add the base url
  if (url && !url.includes("http")) {
    url = config.s3.baseUrl + user?.image;
  }
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        trackEvent("Player Avatar Clicked", { userId: user?.userId });
        navigation.navigate(routes.PERSONAL_STATS as never);
      }}
      accessibilityLabel="Player Personal Stats"
      accessibilityHint="Tap to view your personal stats">
      <View style={styles.avatarContainer}>
        <Image style={styles.image} source={{ uri: url }} />
        <AppText style={styles.title}>{user?.nickName}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    alignItems: "flex-end",
  },
  avatarContainer: {
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderColor: colors.gold,
    borderWidth: 2,
  },
  title: {
    fontSize: 10,
    color: colors.gold,
    textAlign: "center",
  },
});

export default PlayerAvatar;
