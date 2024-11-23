import Product from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).send("Name is required.");
    }

    const existedProduct = await Product.findOne({ name });
    if (existedProduct) {
      return res.status(409).send("Product already exists.");
    }

    if (!req.files || !req.files.productImage || !req.files.productImage[0]) {
      return res.status(400).send("Product image are required.");
    }

    const imageUrls = req.files?.productImage[0]?.path;

    const product = await Product.create({
      name,
      productImage: imageUrls,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products.length) {
      return res.status(404).send("No product found.");
    }

    return res.status(200).json({
      message: "Product fetched successfully.",
      products,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export { createProduct, getProducts };
