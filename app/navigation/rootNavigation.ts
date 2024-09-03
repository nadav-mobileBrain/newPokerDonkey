import React from "react";
import {
  NavigationContainerRef,
  ParamListBase,
} from "@react-navigation/native";

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>();

const navigate = (name: string, params?: object) => {
  navigationRef?.current?.navigate(name, params);
};

const NavigationUtility = {
  navigate,
};

export default NavigationUtility;
