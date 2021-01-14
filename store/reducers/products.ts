import PRODUCTS from "../../data/dummy-data";

const initialState: any = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod: any) => prod.ownerId === "u1"),
};

export default (state = initialState, action: any) => {
  return state;
};
