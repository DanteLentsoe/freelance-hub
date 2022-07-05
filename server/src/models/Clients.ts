import mongoose, { Mongoose } from "mongoose";
import { Client } from "../contants/types";

const ClientData = new mongoose.Schema<Client>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientData);
