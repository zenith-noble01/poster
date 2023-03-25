import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => console.error(error.message));
};
