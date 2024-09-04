import Constants from "expo-constants";

const homeIp = "10.0.0.6";
const workIp = "192.168.1.12";
const meirIp = "192.168.1.152";

const settings = {
  dev: {
    baseURL: `http://${workIp}:3030/`,
  },
  production: {
    baseURL: `https://backend-donk-ae6a3b674658.herokuapp.com/`,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
