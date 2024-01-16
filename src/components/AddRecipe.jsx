/**
 * Title: Write a program using JavaScript on AddRecipe
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

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ingredients from "@/data/ingredients";
import { useAddRecipeMutation } from "@/services/myRecipe/myRecipeApi";
import { toast } from "react-hot-toast";
import Image from "next/image";

const AddRecipe = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addRecipe, { isLoading, data, error }] = useAddRecipeMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  /* display creating states */
  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding Recipe...", { id: "addRecipe" });
    }

    if (data) {
      toast.success(data?.message, { id: "addRecipe" });
      setThumbnailPreview(null);
      reset();
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "addRecipe" });
    }
  }, [isLoading, data, error]);

  /* thumbnail preview */
  const handleThumbnailPreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* add recipe handler */
  const handleAddRecipe = async (data) => {
    if (thumbnailPreview !== null) {
      try {
        const body = new FormData();
        body.append("image", data.thumbnail[0]);

        toast.loading("Uploading thumbnail...", { id: "uploadThumbnail" });

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_CLIENT_API_KEY}`,
          {
            method: "POST",
            body,
          }
        );

        const imgbbResponse = await response.json();

        if (imgbbResponse.success) {
          toast.success("Thumbnail uploaded successfully", {
            id: "uploadThumbnail",
          });

          const thumbnail = {
            display_url: imgbbResponse.data.display_url,
            delete_url: imgbbResponse.data.delete_url,
          };

          addRecipe({ ...data, thumbnail });
        } else {
          toast.error(imgbbResponse.error.message, { id: "uploadThumbnail" });
        }
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
        toast.error("Error uploading thumbnail", { id: "uploadThumbnail" });
      }
    } else {
      addRecipe(data);
    }
  };

  return (
    <form
      className="lg:w-1/2 md:w-3/4 w-full mx-auto flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleAddRecipe)}
    >
      {/* recipe title */}
      <label htmlFor="title" className="w-full flex flex-col gap-y-2">
        Title*
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Recipe Title"
          {...register("title", { required: true })}
        />
      </label>

      {/* recipe ingredients */}
      <label htmlFor="ingredients" className="w-full flex flex-col gap-y-2">
        Ingredients*
        <select
          name="ingredients"
          id="ingredients"
          size={10}
          multiple
          {...register("ingredients", { required: true })}
        >
          {ingredients.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.label}>
              {ingredient.label}
            </option>
          ))}
        </select>
      </label>

      {/* recipe instruction */}
      <label htmlFor="instruction" className="w-full flex flex-col gap-y-2">
        Instruction*
        <textarea
          name="instruction"
          id="instruction"
          rows={5}
          placeholder="Enter Recipe Instruction"
          {...register("instruction", { required: true })}
        />
      </label>

      {/* recipe thumbnail */}
      <label htmlFor="thumbnail" className="w-full flex flex-col gap-y-2">
        Thumbnail
        <p className="flex flex-col gap-y-4">
          {thumbnailPreview && (
            <Image
              src={thumbnailPreview}
              alt="thumbnail"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-cover"
            />
          )}

          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            {...register("thumbnail", {
              required: false,
              onChange: handleThumbnailPreview,
            })}
            className="w-full"
          />
        </p>
      </label>

      {/* submit button */}
      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 text-white py-2 mt-8"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipe;
