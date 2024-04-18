const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
    },
    slug: {
      type: String,
      required: [true, "Please provide the slug details"],
    },
    image: {
      type: String,
      required: [true, "Please provide the image url"],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
