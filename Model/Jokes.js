import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const jokesSchema = mongoose.Schema({
  categories: Array,
  created_at: Date,
  icon_url: String,
  id: String,
  updated_at: Date,
  url: String,
  value: String,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

jokesSchema.plugin(paginate);

const jokesModel = mongoose.model("Jokes", jokesSchema);

export default jokesModel;
