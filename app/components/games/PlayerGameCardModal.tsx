import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../AppText";

import colors from "../../config/colors";
import config from "../../config/config";
import AppButton from "../AppButton";
import useApi from "../../hooks/useApi";
import gameApi from "../../api/game";
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../forms";
import * as Yup from "yup";
import ActivityIndicator from "../ActivityIndicator";
import { removeLastBuyIn, addBuyIn } from "../../utils/gameUtils";
import logger from "../../utility/logger";

const validationSchema = Yup.object().shape({
  cashOutAmount: Yup.number().min(0).required().label("Cash Out Amount"),
});

const PlayerGameCardModal = ({
  playerData,
  onClose,
  onAddBuyIn,
  onRemoveBuyIn,
  onCashOut,
}: {
  playerData: any;
  onClose: any;
  onAddBuyIn: any;
  onRemoveBuyIn: any;
  onCashOut: any;
}) => {
  const [buyInAmount, setBuyInAmount] = useState(playerData.buy_ins_amount);
  const [buyInNumber, setBuyInNumber] = useState(playerData.buy_ins_number);
  const [error, setError] = useState<String>("");
  const [cashOutAmount, setCashOutAmount] = useState(
    playerData.cash_out_amount
  );

  const [isLoading, setIsLoading] = useState(false);
  const addBuyInToPlayer = useApi(gameApi.addBuyIn);
  const removeLastBuyInToPlayer = useApi(gameApi.removeLastBuyIn);
  const cashOutPlayer = useApi(gameApi.cashOutPlayer);

  const handleRemoveLastBuyIn = () => {
    removeLastBuyIn(
      buyInNumber,
      buyInAmount,
      removeLastBuyInToPlayer,
      playerData,
      setBuyInAmount,
      setBuyInNumber,
      onRemoveBuyIn,
      onClose
    );
  };

  const handleAddBuyIn = (amount: number) => {
    addBuyIn(
      amount,
      setBuyInAmount,
      setBuyInNumber,
      addBuyInToPlayer,
      playerData,
      onAddBuyIn,
      buyInAmount,
      buyInNumber,
      onClose
    );
  };

  const handleSubmit = async (values: any) => {
    if (buyInAmount < 1) {
      alert("Buy In amount must be greater than 0");
      return;
    }
    setIsLoading(true);
    setCashOutAmount(values.cashOutAmount);
    const result = await cashOutPlayer.request(
      playerData.game_id,
      playerData.user_id,
      values.cashOutAmount,
      playerData.league_id
    );
    if (!result.ok) {
      const errorMsg = (result.data as any).error;
      if (result.data) {
        setError(errorMsg);
        logger.log(errorMsg);
      } else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }
    setIsLoading(false);
    onClose();
    onCashOut(values.cashOutAmount, playerData.user_id);
  };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator visible={isLoading} />}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: playerData?.User?.image.startsWith("https")
              ? playerData?.User?.image
              : `${config.s3.baseUrl}${playerData?.User?.image}`,
          }}
          style={styles.image}
        />
        <AppText style={styles.nickName}>{playerData?.User?.nickName}</AppText>
        {error && <AppText>{error}</AppText>}
      </View>
      <View style={styles.form}>
        <AppButton
          title="Add Buy in 50"
          icon="cash"
          color="secondary"
          onPress={() => handleAddBuyIn(50)}
        />
        <AppButton
          title="Add Buy in 100"
          icon="cash"
          color="purple"
          onPress={() => handleAddBuyIn(100)}
        />
        <AppButton
          title="Cancel last buy in"
          icon="cash-remove"
          color="danger"
          onPress={() => handleRemoveLastBuyIn()}
        />
      </View>
      <View />
      <AppText>Buy in amount: {buyInAmount}</AppText>
      {cashOutAmount > 0 && (
        <AppText>Profit: {cashOutAmount - buyInAmount}</AppText>
      )}
      <AppForm
        initialValues={{ cashOutAmount }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage
          error={addBuyInToPlayer.error}
          visible={addBuyInToPlayer.error}
        />
        <AppFormField
          name="cashOutAmount"
          icon="cash"
          placeholder={
            cashOutAmount ? cashOutAmount.toString() : "Cash Out Amount"
          }
          keyboardType="number-pad"
          width={250}
        />
        {!playerData?.is_cashed_out && (
          <View style={styles.form}>
            <SubmitButton title="Cash Out Player" icon="cash" color="gold" />
          </View>
        )}
        {playerData?.is_cashed_out && (
          <>
            <AppText>Player Cashed Out Already</AppText>
            <AppText>Cash Out Amount: {cashOutAmount}</AppText>
            <AppText style={{ color: "red" }}>Cash Out Again?</AppText>
            <View style={styles.form}>
              <SubmitButton title="Update Cash Out" icon="cash" />
            </View>
          </>
        )}
      </AppForm>
      <View style={styles.form}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    marginVertical: 20,
    width: "75%",
  },
  imageContainer: {
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    borderWidth: 3,
    borderColor: colors.purple,
  },
  nickName: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default PlayerGameCardModal;
