import React, { useEffect, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButtonCmp, Input } from "../../components";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

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

// Constants with useReducer React hook
const FORM_UPDATE = "FORM_UPDATE";

// function to reduce form
const formReducer = (state: any, action: any) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props: any) => {
  const productId = props.route.params.productId;
  let editedProduct: any;
  if (productId) {
    editedProduct = useSelector((state: any) =>
      state.products.userProducts.find((prod: any) => prod.id === productId)
    );
  }
  const { setOptions } = props.navigation;
  const dispatch = useDispatch();

  // Validation With use Reducer

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

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
            onPress={() => {
              if (!formState.formIsValid) {
                Alert.alert(
                  "Wrong Input",
                  "Please check the errors in the form.",
                  [{ text: "Okay" }]
                );
                return;
              }
              if (productId) {
                dispatch(
                  productActions.updateProduct(
                    productId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                  )
                );
              } else {
                dispatch(
                  productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                  )
                );
              }
            }}
            buttonStyle={{ fontSize: 30, fontFamily: "bold" }}
          />
        </HeaderButtons>
      ),
    });
  }, [productId, productActions, formState]);

  const textChangeHandler = (inputIdentifier: string, text: any) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          label="Title"
          errorText="Please enter a valid title!"
        />
        <Input
          keyboardType="default"
          returnKeyType="next"
          label="Image Url"
          errorText="Please enter a valid image url!"
        />
        {editedProduct ? null : (
          <Input
            keyboardType="decimal-pad"
            returnKeyType="next"
            label="Price"
            errorText="Please enter a valid price!"
          />
        )}
        <Input
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          label="Description"
          errorText="Please enter a valid description!"
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;
