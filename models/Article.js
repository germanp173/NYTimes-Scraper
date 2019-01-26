const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a new Article object with the specified schema.
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the model from the schema above and export it.
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
