import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { HeaderButtonCmp } from "../../components";

const styles = StyleSheet.create({});

const OrdersScreen = (props: any) => {
  const orders = useSelector((state: any) => state.orders.orders);
  const { setOptions, navigate, toggleDrawer } = props.navigation;
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonCmp}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions, toggleDrawer]);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData: any) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

export default OrdersScreen;
