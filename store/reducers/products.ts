import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

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
  }
  return state;
};
