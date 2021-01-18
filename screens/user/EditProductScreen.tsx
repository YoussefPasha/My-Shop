import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButtonCmp } from "../../components";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

const EditProductScreen = (props: any) => {
  const productId = props.route.params.productId;
  const { setOptions, navigate, toggleDrawer } = props.navigation;

  useEffect(() => {
    setOptions({
      headerTitle: () =>
        productId ? (
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 24,
              color: Platform.OS === "android" ? "white" : Colors.primary,
            }}
          >
            Edit Product
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 24,
              color: Platform.OS === "android" ? "white" : Colors.primary,
            }}
          >
            Add Product
          </Text>
        ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonCmp}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {}}
            buttonStyle={{ fontSize: 30, fontFamily: "bold" }}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;
