import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";

import { LoadAssets } from "../components";
import Colors from "../constants/Colors";

const fonts = {
  regular: require("../assets/fonts/OpenSans-Regular.ttf"),
  bold: require("../assets/fonts/OpenSans-Bold.ttf"),
};

const ShopStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <LoadAssets {...{ fonts }}>
      <StatusBar style="dark" />
      <ShopStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
          headerTitle: "All products",
        }}
      >
        <ShopStack.Screen
          name="ProductsOverview"
          component={ProductsOverViewScreen}
        ></ShopStack.Screen>
      </ShopStack.Navigator>
    </LoadAssets>
  );
}
