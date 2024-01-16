/**
 * Title: Write a program using JavaScript on MyRecipeApi
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

const { recipeApi } = require("../recipe");

const myRecipeApi = recipeApi.injectEndpoints({
  endpoints: (builder) => ({
    // add recipe
    addRecipe: builder.mutation({
      query: (body) => ({
        url: "recipe",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Recipe"],
    }),

    // get recipes
    getRecipes: builder.query({
      query: () => "recipe",
      providesTags: ["Recipe"],
    }),

    // get a recipe
    getRecipe: builder.query({
      query: (id) => `recipe/${id}`,
      providesTags: ["Recipe"],
    }),

    // update a recipe
    updateRecipe: builder.mutation({
      query: ({ id, body }) => ({
        url: `recipe/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Recipe"],
    }),

    // delete a recipe
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `recipe/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useGetRecipesQuery,
  useGetRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = myRecipeApi;
