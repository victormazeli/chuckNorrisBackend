import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import mongoose from "mongoose";
import config from "./config.js";

const app = express();
async function dbConnect() {
  try {
    await mongoose.connect(config.DB_CONNECTION);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  app.use(cors());
  app.use(express.json());
  await dbConnect();
  app.use("/jokes", router);
  app.listen(config.PORT || 3232, () =>
    console.log(`Server running on port ${config.PORT}`)
  );
}
main();
