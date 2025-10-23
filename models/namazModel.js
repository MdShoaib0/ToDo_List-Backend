import mongoose from "mongoose";

const namazSchema = new mongoose.Schema({
  name: { type: String},
  count: { type: Number, require: true},
});

const Namaz = mongoose.model("Namaz", namazSchema);

export default Namaz;