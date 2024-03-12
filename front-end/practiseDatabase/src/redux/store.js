import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../redux/reducer";
import { rootReducer } from "./userReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: rootReducer,
  },
});

export default store;
