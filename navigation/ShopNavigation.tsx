import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "../components";
import { StatusBar } from "expo-status-bar";

const fonts = {
  regular: require("../assets/fonts/OpenSans-Regular.ttf"),
  bold: require("../assets/fonts/OpenSans-Bold.ttf"),
};

const ShopStack = createStackNavigator();

export default function MainNavigator() {
    return (
      <LoadAssets {...{ fonts }}>
            <StatusBar style="dark" />
            <ShopStack.Navigator>
                
            </ShopStack.Navigator>
      </LoadAssets>
    );
}