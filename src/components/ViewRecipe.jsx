/**
 * Title: Write a program using JavaScript on ViewRecipe
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

import ViewEye from "@/app/icons/ViewEye";
import { useGetRecipeQuery } from "@/services/myRecipe/myRecipeApi";
import React, { useMemo, useState, useEffect } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import Image from "next/image";

function ViewRecipe({ id }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="p-1 border rounded"
        onClick={() => setIsOpen(true)}
      >
        <ViewEye />
      </button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <LoadRecipe id={id} />
        </Modal>
      )}
    </>
  );
}

function LoadRecipe({ id }) {
  const { data, isLoading, error } = useGetRecipeQuery(id);
  const recipe = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching recipe...", { id: "fetchRecipe" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetchRecipe" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetchRecipe" });
    }
  }, [isLoading, data, error]);

  return (
    <section className="flex flex-col gap-y-6">
      {recipe?.thumbnail ? (
        <Image
          src={recipe?.thumbnail?.display_url}
          alt={recipe?.title}
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded object-cover"
        />
      ) : (
        "N/A"
      )}

      <article className="flex flex-col gap-y-4 mt-auto">
        <div className="flex flex-col gap-y-1.5">
          <h1 className="text-base font-medium">{recipe?.title}</h1>
          <p className="text-sm">{recipe?.instruction}</p>
        </div>

        <p className="flex flex-row flex-wrap gap-1">
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
    </section>
  );
}

export default ViewRecipe;
