import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, default: "not-confirmed" },
  avatar: { type: String },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{ type: String, ref: "Role" }],
});

export default mongoose.model("User", UserSchema);
