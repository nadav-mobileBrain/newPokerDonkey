import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

interface CardProps {
  title: string;
  subTitle: string;
  imageUrl: string;
  onPress: any;
  height?: number;
}

const Card = ({
  title,
  subTitle,
  imageUrl,
  onPress,
  height = 150,
}: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          style={[styles.image, { height: height }]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.light,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    transform: [{ scale: 1 }],
  },
  cardHovered: {
    transform: [{ scale: 1.02 }],
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 18,
    marginVertical: 5,
    fontFamily: "Roboto_400Regular",
    opacity: 0.8,
  },
  title: {
    marginBottom: 7,
    color: colors.dark,
    fontSize: 22,
    fontFamily: "Roboto_700Bold",
  },
});

export default Card;
