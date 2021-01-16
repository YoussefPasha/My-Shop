import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components";
import * as cartActions from "../../store/actions/cart";

const ProductsOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  const dispatch = useDispatch();
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
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

export default ProductsOverViewScreen;
