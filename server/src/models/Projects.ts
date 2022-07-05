import mongoose, { Mongoose } from "mongoose";
import { Client } from "../contants/types";

const ProjectData = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Stared", "Completed", "In Progress"],
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectData);
