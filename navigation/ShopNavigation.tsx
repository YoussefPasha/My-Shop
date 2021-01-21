import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";

import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";
import { LoadAssets } from "../components";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const fonts = {
  regular: require("../assets/fonts/OpenSans-Regular.ttf"),
  bold: require("../assets/fonts/OpenSans-Bold.ttf"),
};

const ShopStack = createStackNavigator();
const OrderNavigator = createStackNavigator();
const AdminNavigator = createStackNavigator();
const ShopDrawer = createDrawerNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "bold",
    fontSize: 24,
  },
};

const ProductNavigator = () => {
  return (
    <ShopStack.Navigator screenOptions={defaultScreenOptions}>
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
      <ShopStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerTitle: "Your Cart" }}
      ></ShopStack.Screen>
    </ShopStack.Navigator>
  );
};

const orderNavigatorCmp = () => {
  return (
    <OrderNavigator.Navigator
      screenOptions={{ ...defaultScreenOptions, headerTitle: "Your Orders" }}
    >
      <OrderNavigator.Screen name="Orders" component={OrdersScreen} />
    </OrderNavigator.Navigator>
  );
};

const AdminNavigatorCmp = () => {
  return (
    <AdminNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AdminNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{ headerTitle: "Your Products" }}
      />
      <AdminNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ headerTitle: "Add Product" }}
      />
    </AdminNavigator.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <ShopDrawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: "bold",
          fontSize: 16,
        },
      }}
    >
      <ShopDrawer.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: ({ color }: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Orders"
        component={orderNavigatorCmp}
        options={{
          drawerIcon: ({ color }: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Admin"
        component={AdminNavigatorCmp}
        options={{
          drawerIcon: ({ color }: any) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </ShopDrawer.Navigator>
  );
};

// const AuthStackNavigator = createStackNavigator();

// const AuthNavigator = () => {
//   return (
//     <AuthStackNavigator.Navigator
//       screenOptions={{ ...defaultScreenOptions, headerTitle: "Log In" }}
//     >
//       <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
//     </AuthStackNavigator.Navigator>
//   );
// };

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  return (
    <LoadAssets {...{ fonts }}>
      <StatusBar animated />
      <MainStackNavigator.Navigator screenOptions={{ ...defaultScreenOptions }}>
        <MainStackNavigator.Screen
          name={"Auth"}
          component={AuthScreen}
          options={{ headerTitle: "Authenticate" }}
        />
        <MainStackNavigator.Screen name={"Shop"} component={ShopNavigator} />
      </MainStackNavigator.Navigator>
    </LoadAssets>
  );
};

export default MainNavigator;
