const Products = require("../models/product");

const addProducts = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Products({
      name,
      description,
      price,
      category,
    });
    const saveProduct = await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product save", saveProduct });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const fetchProducts = async (req, res) => {
  try {
    const product = await Products.find();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    } else {
      return res.status(200).json({
        success: true,
        products: product,
        message: "Products fetched",
      });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const fetchSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "The product with the given ID " });
    }
    res.status(200).json({ success: true, single_product: product });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { price } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { $set: { price: price } },
      { new: true },
      { runValidators: true }
    );
    if (!updatedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "The product with the given ID" });
    }
    res.status(200).json({ success: true, message: "succesfull" });
  } catch (error) {
    res.send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedProducts = await Products.findByIdAndDelete(id);
    if (!deletedProducts) {
      return res
        .status(400)
        .json({ success: false, message: "The product with the given ID" });
    }
    res.status(200).json({ success: true, message: "succesfull" });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  addProducts,
  fetchProducts,
  fetchSingleProduct,
  updateProduct,
  deleteProduct,
};
