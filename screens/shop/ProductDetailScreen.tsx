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
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "bold",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "regular",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

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
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}> {selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;
