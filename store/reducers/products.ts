import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState: any = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod: any) => prod.ownerId === "u1"),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product: any) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product: any) => product.id !== action.pid
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod: any) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod: any) => prod.id === action.pid
      );
      const updateAvailableProduct = [...state.availableProducts];
      updateAvailableProduct[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProduct,
        userProducts: updateUserProducts,
      };
  }
  return state;
};
