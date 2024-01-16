/**
 * Title: Write a program using JavaScript on UpdateRecipe
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

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import EditPencil from "@/app/icons/EditPencil";
import {
  useGetRecipeQuery,
  useUpdateRecipeMutation,
} from "@/services/myRecipe/myRecipeApi";
import { useForm } from "react-hook-form";
import ingredients from "@/data/ingredients";
import Image from "next/image";

const UpdateRecipe = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="p-1 border rounded"
        onClick={() => setIsOpen(true)}
      >
        <EditPencil />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <LoadRecipe id={id} setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

const LoadRecipe = ({ id, setIsOpen }) => {
  const {
    data: fetchData,
    isLoading: fetching,
    error: fetchError,
  } = useGetRecipeQuery(id);
  const recipe = useMemo(() => fetchData?.data || [], [fetchData]);
  const [
    updateRecipe,
    { isLoading: updating, data: updateData, error: updateError },
  ] = useUpdateRecipeMutation();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: recipe });

  useEffect(() => {
    if (fetching) {
      toast.loading("Fetching recipe...", { id: "fetchRecipe" });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchRecipe" });
      setThumbnail(fetchData?.data?.thumbnail?.display_url);
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchRecipe" });
    }

    if (updating) {
      toast.loading("Updating recipe...", { id: "updateRecipe" });
    }

    if (updateData) {
      toast.success(updateData?.message, { id: "updateRecipe" });

      if (thumbnailPreview !== null) {
        window.open(updateData?.data?.thumbnail?.delete_url, "_blank");
      }

      setIsOpen(false);
    }

    if (updateError?.data) {
      toast.error(updateError?.data?.message, { id: "updateRecipe" });
    }

    reset(recipe);
  }, [updating, updateData, updateError, reset, recipe]);

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

  const handleUpdateRecipe = async (data) => {
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

          updateRecipe({ id: data._id, body: { ...data, thumbnail } });
        } else {
          toast.error(imgbbResponse.error.message, { id: "uploadThumbnail" });
        }
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
        toast.error("Error uploading thumbnail", { id: "uploadThumbnail" });
      }
    } else {
      updateRecipe({ id: data._id, body: data });
    }
  };

  return (
    <form
      className="w-full mx-auto flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleUpdateRecipe)}
    >
      {/* recipe title */}
      <label htmlFor="title" className="w-full flex flex-col gap-y-2">
        Title
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Your Recipe Title"
          {...register("title", { required: true })}
        />
      </label>

      {/* recipe ingredients */}
      <label htmlFor="ingredients" className="w-full flex flex-col gap-y-2">
        Ingredients
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
        Instruction
        <textarea
          name="instruction"
          id="instruction"
          rows={5}
          placeholder="Your Recipe Instruction"
          {...register("instruction", { required: true })}
        />
      </label>

      {/* recipe thumbnail */}
      <label htmlFor="thumbnail" className="w-full flex flex-col gap-y-2">
        Thumbnail
        <p className="flex flex-col gap-y-4">
          {(thumbnailPreview || thumbnail) && (
            <Image
              src={thumbnailPreview || thumbnail}
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
        Update Recipe
      </button>
    </form>
  );
};

export default UpdateRecipe;
