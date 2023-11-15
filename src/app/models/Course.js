const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoID: { type: String, required: true },
    //level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  { timestamps: true }, 
  { collection: 'courses' }
);

module.exports = mongoose.model("Course", Course);
