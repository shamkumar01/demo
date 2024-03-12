const {
  addProducts,
  fetchProducts,
  fetchSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const authentication = require("../middlerware/auth");

const router = require("express").Router();

router
  .post("/products", addProducts)
  .get("/all-products", authentication, fetchProducts)
  .get("/single-Product/:id", fetchSingleProduct)
  .patch("/update-Product/:id", updateProduct)
  .delete("/delete-Product/:id", deleteProduct);
module.exports = router;
