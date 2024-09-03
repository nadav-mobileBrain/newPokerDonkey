export default {
  expo: {
    name: "PokerDonkey",
    slug: "newPokerDonkey",
    scheme: "newpokerdonkey",
    version: "1.0.0",
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
      "expo-font",
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
      eas: {
        projectId: "d1c31053-2dec-4269-a289-a4fa2410ac0b",
      },
    },
    owner: "nadavg",
  },
};
