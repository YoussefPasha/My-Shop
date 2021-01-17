import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
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
});

const OrderItem = (props: any) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={Colors.primary} title="Show details" onPress={() => {}} />
    </View>
  );
};

export default OrderItem;
