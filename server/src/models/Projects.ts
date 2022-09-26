import mongoose, { Mongoose } from "mongoose";
import { Projects } from "../contants/types";

const ProjectData = new mongoose.Schema<Projects>({
  name: {
    type: String,
  },
  // status: {
  //   type: String,
  //   enum: ["Not Started", "In Progress", "Completed"],
  // },
  description: {
    type: String,
  },
  amount: {
    type: Number,
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
