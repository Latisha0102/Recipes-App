const mongoose = require("mongoose");

const newRecipeSchema = new mongoose.Schema(
  {
    recipeName: "String",
    ingredients: [
      {
        type: "String",
        required: true,
      },
    ],
    instructions: [
      {
        type: "String",
        required: true,
      },
    ],
    cuisine: "String",
    image_url: "String",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NewRecipe", newRecipeSchema);
