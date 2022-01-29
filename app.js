import express from "express";
import Mongoose from "mongoose";
import router from "./routes/router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);
app.use(express.urlencoded({ extended: true }));
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["jpg", "png"],
  index: false,
  redirect: false,
};
app.use("/uploads", express.static("uploads", options));

app.use("/api/v1", router);

Mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB Connect"))
  .catch((e) => console.log("MongoDB Error", e));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
