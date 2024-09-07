export default {
  expo: {
    name: "Poker Donkey",
    slug: "newPokerDonkey",
    scheme: "newpokerdonkey",
    version: "1.0.4",
    orientation: "portrait",
    icon: "./app/assets/appLogo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      "@react-native-google-signin/google-signin",
      "expo-secure-store",
      "@bugsnag/plugin-expo-eas-sourcemaps",
      "expo-font",
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-4169403957560964~6914057081",
          iosAppId: "ca-app-pub-4169403957560964~5798113087",
        },
      ],
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nadavg.newpokerdonkey",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/appLogo.png",
        backgroundColor: "#ffffff",
      },

      package: "com.nadavg.newpokerdonkey",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      bugsnag: {
        apiKey: "1cc2004c8822004ef0fac22062e3c71b",
      },
      eas: {
        projectId: "d1c31053-2dec-4269-a289-a4fa2410ac0b",
      },
    },
    owner: "nadavg",
  },
  updates: {
    url: "https://u.expo.dev/d1c31053-2dec-4269-a289-a4fa2410ac0b",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
};
