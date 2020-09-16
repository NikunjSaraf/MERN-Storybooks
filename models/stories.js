const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const storiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Public",
      enum: ["Public", "Private"],
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stories", storiesSchema);
