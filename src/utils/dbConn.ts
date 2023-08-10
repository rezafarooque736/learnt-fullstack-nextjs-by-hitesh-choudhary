import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, {
      bufferCommands: false,
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error , please make sure mongodb is running: " +
          err.message
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something gone wrong to database", error);
  }
}
