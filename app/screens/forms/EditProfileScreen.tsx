import React, { useState, useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import authStorage from "../../auth/storage";
import AuthContext from "../../auth/context";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppButton from "../../components/AppButton";
import config from "../../config/config";
import colors from "../../config/colors";
import DialogComponent from "../../components/forms/DialogComponent";
import usersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import useAuth from "../../auth/useAuth";
import logger from "../../utility/logger";
import ErrorMessage from "../../components/forms/ErrorMessage";
import ImageInput from "../../components/forms/ImageInput";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required().label("Nick Name"),
  image: Yup.string().label("Image"),
});

const EditProfileScreen = ({ navigation }: any) => {
  const { setUser }: any = useContext(AuthContext);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  const updatePersonaldetailsApi = useApi(usersApi.updatePersonaldetails);
  const deleteAccountApi = useApi(usersApi.deleteAccount);
  const auth = useAuth();
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const imageUri = useMemo(() => {
    if (!user?.image) return "";
    return user.image.startsWith("https")
      ? user.image
      : `${config.s3.baseUrl}${user.image}`;
  }, [user?.image]);

  const [localImageUri, setLocalImageUri] = useState(imageUri);

  const handleSubmit = async (userInfo: any) => {
    const completeUserInfo = {
      ...userInfo,
      image: localImageUri,
      userId: user?.userId,
    };

    const result = await updatePersonaldetailsApi.request(completeUserInfo);
    console.log("🚀 ~ handleSubmit ~ result:", result);

    if (!result.ok) {
      const errorMsg =
        (result.data as any)?.error || "An unexpected error occurred.";
      setError(errorMsg);
      logger.log(errorMsg);
      return;
    }

    const token = (result.data as any).token;
    let authToken = { token: token };
    auth.logIn(authToken);

    restoreUser();
    navigation.navigate(routes.PERSONAL_STATS);
  };

  const deleteAccount = async () => {
    setDeleteDialog(false);
    const result = await deleteAccountApi.request(user?.userId);
    if (!result.ok) {
      const errorMsg =
        (result.data as any)?.error || "An unexpected error occurred.";
      setError(errorMsg);
    } else {
      setError("An unexpected error occurred.");
      logger.log(result);
    }
    auth.logOut();
  };

  return (
    <>
      <ActivityIndicator visible={updatePersonaldetailsApi.loading} />
      <Screen style={styles.container}>
        <LinearGradient
          colors={colors.primaryGradientArray}
          style={styles.background}>
          <AppForm
            initialValues={{ nickName: user?.nickName }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField autoCorrect={false} icon="account" name="nickName" />
            <View style={{ alignItems: "flex-end" }}>
              <ImageInput
                imageUri={localImageUri}
                onChangeImage={(uri) => setLocalImageUri(uri)}
              />
            </View>
            <SubmitButton
              title="Edit Details"
              icon="account-edit"
              color="gold"
            />
          </AppForm>
          {deleteDialog && (
            <DialogComponent
              titleText={"Delete Account"}
              descriptionText="Are you sure you want to delete your account? you will lose all your data!"
              handleCancel={() => setDeleteDialog(false)}
              handleConfirm={() => deleteAccount()}
            />
          )}
          <AppButton
            title="delete account"
            color="danger"
            onPress={() => setDeleteDialog(true)}
            icon="account-remove"
          />
        </LinearGradient>
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
});

export default EditProfileScreen;
