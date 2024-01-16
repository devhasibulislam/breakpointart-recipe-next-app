/**
 * Title: Write a program using JavaScript on DeleteRecipe
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

import { useDeleteRecipeMutation } from "@/services/myRecipe/myRecipeApi";
import React, { useState, useEffect, useMemo } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import TrashBin from "@/app/icons/TrashBin";

const DeleteRecipe = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="p-1 border rounded"
        onClick={() => setIsOpen(true)}
      >
        <TrashBin />
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
  const [deleteRecipe, { isLoading, data, error }] = useDeleteRecipeMutation();
  const recipe = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting recipe...", { id: "deleteRecipe" });
    }

    if (data) {
      toast.success(data?.message, { id: "deleteRecipe" });
      window.open(recipe?.thumbnail?.delete_url, "_blank");
      setIsOpen(false);
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "deleteRecipe" });
    }
  }, [isLoading, data, error]);

  return (
    <section className="flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-2xl font-semibold">Are You Sure?</h1>
      <div className="flex flex-row gap-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-green-500 rounded"
          onClick={() => deleteRecipe(id)}
        >
          Yes
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-red-500 rounded"
          onClick={() => setIsOpen(false)}
        >
          No
        </button>
      </div>
    </section>
  );
};

export default DeleteRecipe;
