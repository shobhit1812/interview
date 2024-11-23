import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/create-product").post(
  verifyJWT,
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  createProduct
);

router.route("/get-products").get(verifyJWT, getProducts);

export default router;
