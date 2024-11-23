import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Unauthorized request: No token provided.");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-fullName -email -password -token -createdAt -updatedAt -__v"
    );

    if (!user) {
      return res.status(401).send("Unauthorized request: Invalid token.");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized request: " + error.message);
  }
};

export default verifyJWT;
