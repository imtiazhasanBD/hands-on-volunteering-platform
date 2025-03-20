const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  urgency: { type: String, enum: ["Low", "Medium", "Urgent"], required: true },
  category: { type: String },
  location: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userName: { type: String },
      message: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
