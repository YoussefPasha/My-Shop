import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { MainButton, ProductItem } from "../../components";
import { HeaderButtonCmp } from "../../components";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { setOptions, navigate, toggleDrawer, addListener } = props.navigation;

  const products = useSelector(
    (state: any) => state.products.availableProducts
  );

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsCalled(false);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsCalled(true);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, setIsCalled]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = addListener("focus", loadProducts);
    setIsLoading(false);
    return unsubscribe;
  }, [loadProducts, setIsLoading]);

  useEffect(() => {
    loadProducts();
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
  }, [setOptions, navigate, toggleDrawer, dispatch, loadProducts]);
  const selectHandler = (id: string) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
    });
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontFamily: "regular", color: "red" }}>
          An error occurred!
        </Text>
        <MainButton
          color={Colors.primary}
          title="Try again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0 && isCalled) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontFamily: "bold" }}>
          No Products found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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
