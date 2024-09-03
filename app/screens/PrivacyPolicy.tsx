import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

const PrivacyPolicyScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Screen style={styles.screen}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <AppText style={styles.title}>Privacy Policy</AppText>
        <ScrollView style={styles.scrollView}>
          <AppText style={styles.text}>
            Last Updated: 24/08/2024 {"\n"} 1. Introduction Poker Donkey ("we",
            "our", or "us") is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our mobile application (the "App").
            {"\n"} 2. Information We Collect {"\n"}2.1. Information provided
            through Google Sign-In: - Email address - Name - Profile picture
            {"\n"} 2.2. Usage Data: - Gameplay statistics - In-app activity -
            Device information (e.g., device type, operating system){"\n"} 3.
            How We Use Your Information We use the collected information for
            various purposes, including: - Providing and maintaining the App -
            Improving and personalizing user experience - Analyzing usage of the
            App - Communicating with you - Ensuring the security of the App{" "}
            {"\n"}4. Data Storage and Security We implement appropriate
            technical and organizational security measures to protect your
            information. However, please note that no method of transmission
            over the internet or electronic storage is 100% secure.{"\n"} 5.
            Data Sharing and Disclosure We do not sell your personal
            information. We may share your information in the following
            situations: - With your consent - To comply with legal obligations -
            To protect our rights, privacy, safety, or property{"\n"}6. Your
            Data Protection Rights Depending on your location, you may have
            certain rights regarding your personal information, such as: - The
            right to access - The right to rectification - The right to erasure
            - The right to restrict processing - The right to data portability -
            The right to object{"\n"} 7. Children's Privacy The App is not
            intended for children under 13. We do not knowingly collect personal
            information from children under 13.{"\n"} 8. Changes to This Privacy
            Policy We may update our Privacy Policy from time to time. We will
            notify you of any changes by posting the new Privacy Policy on this
            page and updating the "Last Updated" date.{"\n"} 9. Third-Party
            Services The App uses Google Sign-In. Please refer to Google's
            Privacy Policy for information on how they handle your data. {"\n"}
            10. International Data Transfers Your information may be transferred
            to and maintained on computers located outside of your state,
            province, country, or other governmental jurisdiction where data
            protection laws may differ.{"\n"} 11. Data Retention We will retain
            your personal information only for as long as necessary for the
            purposes set out in this Privacy Policy.{"\n"} 12. Contact Us If you
            have any questions about this Privacy Policy, please contact us at
            nadavg1000@gmail.com. By using the App, you agree to the collection
            and use of information in accordance with this Privacy Policy.
          </AppText>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.purple,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.dark,
  },
});

export default PrivacyPolicyScreen;
