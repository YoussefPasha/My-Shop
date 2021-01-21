import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Input, MainButton } from "../../components";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const AuthScreen = (props: any) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address!"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="email"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              errorMessage="Please enter a valid email password!"
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={{ marginTop: 10 }}>
              <MainButton
                title="Login"
                color={Colors.primary}
                onPress={() => {}}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <MainButton
                title="Switch to Sign Up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
