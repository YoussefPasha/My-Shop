import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ProductItem } from "../../components";

const ProductsOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData: any) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductsOverViewScreen;
