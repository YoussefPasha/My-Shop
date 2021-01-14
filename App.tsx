import React from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import productReducers from "./store/reducers/products";

const rootReducer = combineReducers({
  products: productReducers,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </Provider>
  );
}
