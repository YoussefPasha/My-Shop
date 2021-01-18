import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import { Card, MainButton } from "../UI";

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  totalAmount: {
    fontFamily: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "regular",
    color: "#888",
  },
  detailItems: {
    width: "80%",
  },
});

const OrderItem = (props: any) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <MainButton
        color={showDetails ? Colors.accent : Colors.primary}
        title={!showDetails ? "Show Details" : "Hide Details"}
        onPress={() => {
          setShowDetails(!showDetails);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem: any, index: number) => (
            <CartItem
              key={index}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              noDelete
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;
