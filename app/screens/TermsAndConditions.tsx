import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

const TermsAndConditionsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Screen style={styles.screen}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <AppText style={styles.title}>Terms and Conditions</AppText>
        <ScrollView style={styles.scrollView}>
          <AppText style={styles.text}>
            Last updated: 21/08/2024 {"\n"}1. Acceptance of Terms By accessing
            or using the Poker Donkey app ("the App"), you agree to comply with
            and be bound by these Terms and Conditions. If you do not agree to
            these terms, please do not use the App. {"\n"} 2. Description of
            Service Poker Donkey is an app designed to collect and display
            statistics about home poker games. The App uses Google Sign-In to
            authenticate users and collect basic profile information including
            email, name, and profile image.{"\n"} 3. User Registration and Data
            {"\n"}
            3.1. To use the App, you must sign in using your Google account. By
            doing so, you authorize us to collect and store your email address,
            name, and profile image as provided by Google.{"\n"} 3.2. You are
            responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account.
            {"\n"}3.3. You agree to provide accurate and complete information
            when using the App.{"\n"} 4. Privacy and Data Usage 4.1. We respect
            your privacy and are committed to protecting your personal data.
            Please refer to our Privacy Policy for details on how we collect,
            use, and share your information. {"\n"}4.2. By using the App, you
            consent to the collection and use of your information as described
            in our Privacy Policy.{"\n"} 5. User Content {"\n"}5.1. You retain
            all rights to any content you submit, post, or display on or through
            the App.{"\n"} 5.2. By submitting content to the App, you grant
            Poker Donkey a worldwide, non-exclusive, royalty-free license to
            use, reproduce, modify, and distribute your content for the purpose
            of operating and improving the App.{"\n"} 6. Prohibited Activities
            You agree not to engage in any of the following activities:{"\n"}
            6.1. Violating any applicable laws or regulations. {"\n"}6.2.
            Interfering with or disrupting the integrity or performance of the
            App.{"\n"} 6.3. Attempting to gain unauthorized access to the App or
            its related systems.{"\n"} 6.4. Using the App for any illegal or
            unauthorized purpose.{"\n"} 7. Intellectual Property{"\n"} 7.1. The
            App and its original content, features, and functionality are owned
            by nadav galili and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws. {"\n"}8. Disclaimer of Warranties{"\n"}8.1. The App is
            provided on an "as is" and "as available" basis without any
            warranties of any kind.{"\n"} 8.2. We do not warrant that the App
            will be uninterrupted, timely, secure, or error-free.{"\n"} 9.
            Limitation of Liability To the fullest extent permitted by
            applicable law, Poker Donkey shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages resulting
            from your use of the App.{"\n"} 10. Changes to Terms We reserve the
            right to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days' notice prior to any new
            terms taking effect. {"\n"}11. Governing Law These Terms shall be
            governed by and construed in accordance with the laws of Israel,
            without regard to its conflict of law provisions. {"\n"}12. Contact
            Us If you have any questions about these Terms, please contact us at
            nadavg1000@gmail.com. By using Poker Donkey, you acknowledge that
            you have read and understood these Terms and Conditions and agree to
            be bound by them.
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

export default TermsAndConditionsScreen;
