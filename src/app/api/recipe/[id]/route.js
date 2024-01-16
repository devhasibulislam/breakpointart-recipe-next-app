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
 * Date: 17, January 2024
 */

import dbConnect from "@/libs/db.lib";
import Recipe from "@/models/recipe.model";
import { NextResponse } from "next/server";

/* get a recipe */
export async function GET(_, { params }) {
  try {
    await dbConnect();

    const recipe = await Recipe.findById(params.id);

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Recipe fetched successfully",
          data: recipe,
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

/* update a recipe */
export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const recipe = await req.json();
    const result = await Recipe.findByIdAndUpdate(params.id, {
      $set: recipe,
    });

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Recipe updated successfully",
          data: result,
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

/* delete a recipe */
export async function DELETE(_, { params }) {
  try {
    await dbConnect();

    const recipe = await Recipe.findByIdAndDelete(params.id);

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipe not found",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Recipe deleted successfully",
          data: recipe,
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
