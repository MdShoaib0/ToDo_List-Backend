import mongoose from "mongoose";

const namazSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true, // one record per namaz (Fajr, Dhuhr, etc.)
  },
  namazCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Namaz = mongoose.model("Namaz", namazSchema);

export default Namaz;