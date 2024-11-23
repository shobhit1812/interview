import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/create-product").post(
  verifyJWT,
  (req, res, next) => {
    const maxCount = req.user.isAdmin ? 5 : 1;
    const uploadMiddleware = upload.fields([
      {
        name: "productImage",
        maxCount,
      },
    ]);
    uploadMiddleware(req, res, (err) => {
      if (err) return res.status(400).send(err.message);
      next();
    });
  },
  createProduct
);

router.route("/get-products").get(verifyJWT, getProducts);
router.route("/get-product/:productId").get(verifyJWT, getProductById);

export default router;
