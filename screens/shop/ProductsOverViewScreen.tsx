import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ProductItem } from "../../components";

const ProductsOverViewScreen = () => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemDate: any) => (
        <ProductItem
          image={itemDate.item.imageUrl}
          title={itemDate.item.title}
          price={itemDate.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductsOverViewScreen;
