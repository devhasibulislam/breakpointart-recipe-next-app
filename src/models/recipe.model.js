/**
 * Title: Write a program using JavaScript on Recipe Model
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https:/instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 16, January 2024
 */

import { Schema, models, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instruction: { type: String, required: true },
    thumbnail: { display_url: String, delete_url: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Recipe = models?.Recipe || model("Recipe", recipeSchema);
export default Recipe;
