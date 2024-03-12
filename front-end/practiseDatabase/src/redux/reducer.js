import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
  } from "./action";
  
  const initialStateProducts = {
    products: [],
    isLoading: false,
    success: "",
    error: "",
  };
  
 
  
  const productsReducer = (state = initialStateProducts, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, isLoading: true };
  
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          products: action.payload.products,
          success: action.payload.message,
        };
  
      case FETCH_PRODUCTS_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

  
  export { productsReducer };
  