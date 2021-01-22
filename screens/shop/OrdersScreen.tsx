import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtonCmp, OrderItem } from "../../components";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";

const OrdersScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders);
  const { setOptions, toggleDrawer } = props.navigation;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    };
    fetchOrders();
  }, [dispatch]);

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontFamily: "bold" }}>
          No Products found. Maybe start ordering some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData: any) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
