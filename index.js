const express = require("express");

const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

const NewRecipe = require("./models/Recipe.model");

app.use(express.json());

const corsOption = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOption));
initializeDatabase();

app.get("/newRecipe", async (req, res) => {
  const recipe = await NewRecipe.find();
  res.status(200).json({ data: { recipe } });
});

app.post("/newRecipe", async (req, res) => {
  const { recipeName, ingredients, instructions, cuisine, image_url } =
    req.body;
  try {
    const recipe = new NewRecipe({
      recipeName,
      ingredients,
      instructions,
      cuisine,
      image_url,
    });
    await recipe.save();
    res
      .status(200)
      .json({ message: "Recipe saved succesfully", data: { recipe } });
  } catch (error) {
    res.status(404).json({ message: "Failed to post a job" });
  }
});

app.get("/newRecipe/:newRecipeId", async (req, res) => {
  const recipeId = req.params.newRecipeId;
  try {
    const recipe = await NewRecipe.findById(recipeId);
    res.status(200).json({ data: recipe });
  } catch (error) {
    res.status(404).json({ message: "Error finding the recipe" });
  }
});

app.delete("/newRecipe/:newRecipeId", async (req, res) => {
  const recipeId = req.params.newRecipeId;

  try {
    const recipe = await NewRecipe.findByIdAndDelete(recipeId);

    if (!recipe) {
      res.status(404).json({ message: "Failed to find the recipe" });
    }

    res.status(200).json({ message: "Deleted Successfully", data: recipe });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the recipe" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
