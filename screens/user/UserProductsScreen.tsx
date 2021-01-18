import React, { useEffect } from "react";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { HeaderButtonCmp, MainButton, ProductItem } from "../../components";
import Colors from "../../constants/Colors";

const UserProductsScreen = (props: any) => {
  const userProducts = useSelector((state: any) => state.products.userProducts);
  const { setOptions, navigate, toggleDrawer } = props.navigation;
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
    });
  }, [setOptions, toggleDrawer]);
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        >
          <MainButton color={Colors.primary} title="EDIT" onPress={() => {}} />
          <MainButton
            color={Colors.primary}
            title="DELETE"
            onPress={() => {}}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
