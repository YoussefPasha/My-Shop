import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";

import { LoadAssets } from "../components";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const fonts = {
  regular: require("../assets/fonts/OpenSans-Regular.ttf"),
  bold: require("../assets/fonts/OpenSans-Bold.ttf"),
};

const ShopStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <LoadAssets {...{ fonts }}>
      <StatusBar animated />
      <ShopStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
          headerTitleStyle: {
            fontFamily: "bold",
            fontSize: 24,
          },
        }}
      >
        <ShopStack.Screen
          name="ProductsOverview"
          component={ProductsOverViewScreen}
          options={{
            headerTitle: "Products",
          }}
        ></ShopStack.Screen>
        <ShopStack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
        ></ShopStack.Screen>
        <ShopStack.Screen name="Cart" component={CartScreen}></ShopStack.Screen>
      </ShopStack.Navigator>
    </LoadAssets>
  );
}
