import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({});

const OrdersScreen = (props: any) => {
  const orders = useSelector((state: any) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData: any) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

export default OrdersScreen;
