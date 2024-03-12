import axios from "axios";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";



export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });

  try {
    const response = await axios.get("http://localhost:4000/api/all-products");
    console.log("res", response)
    if (response.data.success) {
        dispatch(
            { type: FETCH_PRODUCTS_SUCCESS,
                 payload:{products :response.data.products , message : response.data.message }
                  }); 
    }
    
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_PRODUCTS_ERROR, payload: "Something went wrong" });
  }
};


