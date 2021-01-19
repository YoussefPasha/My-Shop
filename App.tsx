import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import productReducers from "./store/reducers/products";
import MainNavigator from "./navigation/ShopNavigation";
import cartReducer from "./store/reducers/cart";
import orders from "./store/reducers/orders";

const rootReducer = combineReducers({
  products: productReducers,
  cart: cartReducer,
  orders: orders,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
