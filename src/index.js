import dotenv from "dotenv";
import connectDB from "./database/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

app.get("/", (_, res) => {
  res.send({ status: 200, message: "ok" });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 1023;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error.message);
  }
};

startServer();
