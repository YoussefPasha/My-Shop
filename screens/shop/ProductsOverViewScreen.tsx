import React, { useEffect } from "react";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { MainButton, ProductItem } from "../../components";
import { HeaderButtonCmp } from "../../components";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const { setOptions, navigate, toggleDrawer } = props.navigation;
  useEffect(() => {
    dispatch(productsActions.fetchProducts());
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonCmp}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
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
  }, [setOptions, navigate, toggleDrawer, dispatch]);
  const selectHandler = (id: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
    });
  };
  return (
    <FlatList
      data={products}
      renderItem={(itemData: any) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => selectHandler(itemData.item.id)}
        >
          <MainButton
            color={Colors.primary}
            title="VIEW DETAILS"
            onPress={() => selectHandler(itemData.item.id)}
          />
          <MainButton
            color={Colors.primary}
            title="ADD TO CART"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverViewScreen;
