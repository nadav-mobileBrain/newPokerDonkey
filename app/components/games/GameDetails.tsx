import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import LeagueLogo from "../leagues/LeagueLogo";
import dayjs from "dayjs";

const GameDetails = ({
  league,
  game,
  userGameData,
  onCalculateMoneyInTheBank,
}: {
  league: any;
  game: any;
  userGameData: any;
  onCalculateMoneyInTheBank: any;
}) => {
  const totalBuyIn = userGameData.reduce((acc: number, userGame: any) => {
    return acc + userGame.buy_ins_amount;
  }, 0);

  const cashInHand = userGameData.reduce((acc: number, userGame: any) => {
    return userGame.is_cashed_out && userGame.cash_out_amount !== undefined
      ? acc + parseInt(userGame.cash_out_amount)
      : acc;
  }, 0);

  // Move the setState logic into useEffect
  useEffect(() => {
    onCalculateMoneyInTheBank(totalBuyIn - cashInHand);
  }, [totalBuyIn, cashInHand, onCalculateMoneyInTheBank]);

  return (
    <View style={styles.gameDetailsContainer}>
      <LeagueLogo
        logoUrl={league.league_image}
        leagueName={league.league_name}
      />
      <AppText style={styles.gameDate}>
        Game Admin:{game?.gameManager?.nickName}
      </AppText>
      <AppText style={styles.gameDate}>
        Started At: {dayjs(game.created_at).format("DD/MM/YYYY hh:mm:ss")}
      </AppText>
      <View>
        <View style={styles.totalContainer}>
          <AppText style={styles.totalText}>Total buy ins</AppText>
          <AppText style={styles.totalText}>{totalBuyIn}</AppText>
        </View>
        {cashInHand > 0 && (
          <>
            <View style={styles.totalContainer}>
              <AppText style={styles.totalText}>Total cash Out</AppText>
              <AppText style={styles.totalText}>{cashInHand}</AppText>
            </View>
            <View style={styles.totalContainer}>
              <AppText style={styles.totalText}>
                Total cash left in bank
              </AppText>
              <AppText style={styles.totalText}>
                {totalBuyIn - cashInHand}
              </AppText>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameDetailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: colors.gold,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  gameDate: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "50%",
  },

  totalText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default GameDetails;
