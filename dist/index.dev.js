"use strict";

var express = require("express");

var mongoose = require("mongoose");

var app = express();

var cors = require("cors");

var _require = require("./db/db.connect"),
    initializeDatabase = _require.initializeDatabase;

var NewRecipe = require("./models/Recipe.model");

app.use(express.json());
var corsOption = {
  origin: "*",
  credentials: true
};
app.use(cors(corsOption));
initializeDatabase();
app.get("/newRecipe", function _callee(req, res) {
  var recipe;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(NewRecipe.find());

        case 2:
          recipe = _context.sent;
          res.status(200).json({
            data: {
              recipe: recipe
            }
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/newRecipe", function _callee2(req, res) {
  var _req$body, recipeName, ingredients, instructions, cuisine, image_url, recipe;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, recipeName = _req$body.recipeName, ingredients = _req$body.ingredients, instructions = _req$body.instructions, cuisine = _req$body.cuisine, image_url = _req$body.image_url;
          _context2.prev = 1;
          recipe = new NewRecipe({
            recipeName: recipeName,
            ingredients: ingredients,
            instructions: instructions,
            cuisine: cuisine,
            image_url: image_url
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(recipe.save());

        case 5:
          res.status(200).json({
            message: "Recipe saved succesfully",
            data: {
              recipe: recipe
            }
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(404).json({
            message: "Failed to post a job"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.get("/newRecipe/:newRecipeId", function _callee3(req, res) {
  var recipeId, recipe;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          recipeId = req.params.newRecipeId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(NewRecipe.findById(recipeId));

        case 4:
          recipe = _context3.sent;
          res.status(200).json({
            data: recipe
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(404).json({
            message: "Error finding the recipe"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app["delete"]("/newRecipe/:newRecipeId", function _callee4(req, res) {
  var recipeId, recipe;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          recipeId = req.params.newRecipeId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(NewRecipe.findByIdAndDelete(recipeId));

        case 4:
          recipe = _context4.sent;

          if (!recipe) {
            res.status(404).json({
              message: "Failed to find the recipe"
            });
          }

          res.status(200).json({
            message: "Deleted Successfully",
            data: recipe
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            message: "Failed to delete the recipe"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ", PORT);
});