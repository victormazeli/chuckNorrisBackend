import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  id: Number,
  name: String,
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
