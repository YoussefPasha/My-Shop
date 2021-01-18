import React, { useEffect } from "react";
import { Alert, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtonCmp, MainButton, ProductItem } from "../../components";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.products.userProducts);
  const { setOptions, navigate, toggleDrawer } = props.navigation;
  const dispatch = useDispatch();
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonCmp}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navigate("EditProduct", { productId: "" });
            }}
            buttonStyle={{ fontSize: 30, fontFamily: "bold" }}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions, toggleDrawer]);

  const deleteHandler = (id: string) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "NO", style: "destructive" },
      {
        text: "YES",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  const editProductHandler = (id: string) => {
    navigate("EditProduct", { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <MainButton
            color={Colors.primary}
            title="EDIT"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <MainButton
            color={Colors.primary}
            title="DELETE"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
