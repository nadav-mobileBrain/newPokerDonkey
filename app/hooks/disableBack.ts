import { BackHandler } from "react-native";

const blockBackButton = () => {
  const disableBackButton = () => true;
  BackHandler.addEventListener("hardwareBackPress", disableBackButton);

  return () => {
    BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
  };
};

export default blockBackButton;
