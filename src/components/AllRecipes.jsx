/**
 * Title: Write a program using JavaScript on AllRecipes
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

"use client";

import React, { useEffect, useMemo, useState } from "react";
import ingredients from "@/data/ingredients";
import {
  useGetRecipesQuery,
} from "@/services/myRecipe/myRecipeApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import EditPencil from "@/app/icons/EditPencil";
import TrashBin from "@/app/icons/TrashBin";
import ViewRecipe from "./ViewRecipe";
import DeleteRecipe from "./DeleteRecipe";
import UpdateRecipe from "./UpdateRecipe";

const AllRecipes = () => {
  const { data, isLoading, error } = useGetRecipesQuery();
  const recipes = useMemo(() => data?.data || [], [data]);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { register, handleSubmit, watch } = useForm();
  const searchInput = watch("search");
  const selectedIngredient = watch("ingredient");

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching recipes...", { id: "fetchRecipes" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetchRecipes" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetchRecipes" });
    }
  }, [isLoading, data, error]);

  useEffect(() => {
    if (searchInput || selectedIngredient !== "All") {
      const updatedFilteredRecipes = recipes.filter((recipe) => {
        const titleMatches = searchInput
          ? recipe.title.toLowerCase().includes(searchInput?.toLowerCase())
          : true;

        const ingredientMatches =
          selectedIngredient === "All" ||
          recipe.ingredients.some(
            (ingredient) =>
              ingredient.toLowerCase() === selectedIngredient?.toLowerCase()
          );

        return titleMatches && ingredientMatches;
      });

      setFilteredRecipes(updatedFilteredRecipes);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [recipes, searchInput, selectedIngredient]);

  return (
    <section className="flex flex-col gap-y-6">
      <form
        className="w-full flex flex-row gap-x-4"
        onSubmit={handleSubmit(() => {})}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Type recipe's name"
          className="w-full"
          {...register("search")}
        />
        <select
          name="ingredient"
          id="ingredient"
          defaultValue="All"
          className="w-fit"
          {...register("ingredient")}
        >
          <option value="All">All ingredient</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.label}>
              {ingredient.label}
            </option>
          ))}
        </select>
      </form>

      {/* recipe cards */}
      <div className="grid grid-cols-3 gap-4">
        {filteredRecipes?.map((recipe) => (
          <div
            key={recipe._id}
            className="p-4 border flex flex-col gap-y-4 relative"
          >
            {recipe?.thumbnail ? (
              <Image
                src={recipe?.thumbnail?.display_url}
                alt={recipe?.title}
                width={80}
                height={50}
                className="w-[80px] h-[50px] object-cover"
              />
            ) : (
              "N/A"
            )}

            <article className="flex flex-col gap-y-4 mt-auto">
              <div className="flex flex-col gap-y-1.5">
                <h1 className="text-base font-medium line-clamp-2">
                  {recipe?.title}
                </h1>
                <p className="text-sm line-clamp-3">{recipe?.instruction}</p>
              </div>

              <p className="flex flex-row gap-x-1 overflow-x-auto scrollbar-hide">
                {recipe?.ingredients?.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="whitespace-nowrap text-xs border px-2 py-0.5"
                  >
                    {ingredient}
                  </span>
                ))}
              </p>
            </article>

            {/* action buttons */}
            <div className="absolute top-4 right-4 flex flex-row gap-x-2">
              <ViewRecipe id={recipe._id} />
              <UpdateRecipe id={recipe._id} />
              <DeleteRecipe id={recipe._id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllRecipes;
