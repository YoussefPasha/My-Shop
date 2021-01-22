import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ActivityIndicator, Platform, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";

import ProductsOverViewScreen from "../screens/shop/ProductsOverViewScreen";
import { LoadAssets, MainButton } from "../components";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

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
  const dispatch = useDispatch();
  return (
    <ShopDrawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: "bold",
          fontSize: 16,
        },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, padding: 20 }}>
              <MainButton
                title="Logout"
                color={Colors.accent}
                font="bold"
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </View>
          </DrawerContentScrollView>
        );
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

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  let userState: any = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData: any = await AsyncStorage.getItem("userData");
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      userState = token;
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    setIsLoading(true);
    tryLogin();
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <LoadAssets {...{ fonts }}>
      <StatusBar animated />
      {!userState ? (
        <MainStackNavigator.Navigator
          screenOptions={{ ...defaultScreenOptions }}
        >
          <MainStackNavigator.Screen
            name={"Auth"}
            component={AuthScreen}
            options={{
              headerTitle: "Authenticate",
            }}
          />
        </MainStackNavigator.Navigator>
      ) : (
        <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
          <MainStackNavigator.Screen name={"Shop"} component={ShopNavigator} />
        </MainStackNavigator.Navigator>
      )}
    </LoadAssets>
  );
};

export default MainNavigator;
