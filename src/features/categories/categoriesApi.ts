/**
 * RTK Query API for categories
 * Endpoints match backend category GET routes (see ref_backend/routes/api/category/get.js)
 */
import api from '../api/api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get all categories (optionally filtered by branch)
     * GET /category?branch=...
     */
    getCategories: builder.query({
      query: (branchId) => branchId ? `category?branch=${branchId}` : 'category',
    }),
    /**
     * Get single category by ID
     * GET /category/data/:categoryID
     */
    getCategoryById: builder.query({
      query: (categoryID) => `category/data/${categoryID}`,
    }),

    /**
     * Get single category by slug
     * GET /category/data/slug/:slug
     */
    getCategoryBySlug: builder.query({
      query: (slug) => `category/data/slug/${encodeURIComponent(slug)}`,
    }),

    /**
     * Get all categories and subcategories for a branch
     * GET /category/branch/:branchID
     */
    getCategoriesWithSubcategories: builder.query({
      query: (branchID) => `category/branch/${branchID}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryBySlugQuery,
  useGetCategoriesWithSubcategoriesQuery,
} = categoriesApi;
