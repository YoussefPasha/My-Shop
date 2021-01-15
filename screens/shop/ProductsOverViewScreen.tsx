import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverViewScreen = () => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemDate: any) => <Text>{itemDate.item.title}</Text>}
    />
  );
};

export default ProductsOverViewScreen;

const styles = StyleSheet.create({});
