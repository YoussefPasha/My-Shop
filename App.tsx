import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import productReducers from "./store/reducers/products";
import MainNavigator from "./navigation/ShopNavigation";

const rootReducer = combineReducers({
  products: productReducers,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
