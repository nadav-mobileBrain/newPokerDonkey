import React from "react";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";
import colors from "../../config/colors";

interface PlayerProps {
  title: string | undefined;
  subTitle?: string;
  image?: any | undefined;
  IconComponent?: any;
  onPress: any;
  renderRightActions?: any;
  ItemsSeperatorComponent?: any;
}

const PlayerDetails = ({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  ItemsSeperatorComponent,
}: PlayerProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={2}>
                  {subTitle}
                </AppText>
              )}
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={colors.medium}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 7,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
});

export default PlayerDetails;
