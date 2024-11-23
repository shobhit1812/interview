import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MONGODB connected !!! DB READYSTATE: ${connectionInstance.connection.readyState}`
    );
  } catch (error) {
    console.log("MONGODB ERROR CODENAME: ", error.codeName);
  }
};

export default connectDB;
