import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/action";
import { toast, Toaster } from "sonner";

function Products() {
  const product = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const success = useSelector((state) => state.products.success);
  const error = useSelector((state) => state.products.error);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      //   clearMessages();
    }

    if (error) {
      toast.error(error);
      //   clearMessages();
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Toaster position="bottom-center" />

      {isLoading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <>
          <div className="cartBtn mt-3 me-4 d-flex justify-content-end align-item-center"></div>

          <h1 className="text-center">Products</h1>

          <div className="container-fluid d-flex flex-wrap justify-content-center">
            {product.map((item) => {
              return (
                <>
                  <div
                    className="card mx-3 my-3"
                    key={item.id}
                    style={{ width: "18rem" }}
                  >
                    <div>
                      <h2>{item.name}</h2>
                    </div>
                    <h2>${item.price}</h2>
                    <h3>Product - {item.category}</h3>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
