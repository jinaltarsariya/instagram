const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, trim: true },
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    mobileNumber: { type: String, trim: true },
    password: { type: String, trim: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
