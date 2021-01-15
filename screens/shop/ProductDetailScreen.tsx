import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({});

const ProductDetailScreen = (props: any) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state: any) =>
    state.products.availableProducts.find((prod: any) => prod.id === productId)
  );
  const { setOptions } = props.navigation;
  useEffect(() => {
    setOptions({ headerTitle: selectedProduct?.title });
  }, [setOptions]);
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

export default ProductDetailScreen;
