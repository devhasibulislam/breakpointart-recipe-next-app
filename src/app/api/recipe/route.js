/**
 * Title: Write a program using JavaScript on Route
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 16, January 2024
 */

import dbConnect from "@/libs/db.lib";
import Recipe from "@/models/recipe.model";
import { NextResponse } from "next/server";

/* create a recipe */
export async function POST(req) {
  try {
    await dbConnect();

    const recipe = await req.json();
    const result = await Recipe.create(recipe);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not created",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Recipe created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/* get all recipes */
export async function GET() {
  try {
    await dbConnect();

    const recipes = await Recipe.find();

    if (!recipes) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipes not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Recipes fetched successfully",
          data: recipes,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
