/**
 * RTK Query API for categories
 * Endpoints match backend category GET routes (see ref_backend/routes/api/category/get.js)
 */
import api from '../api/api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get paginated categories with optional search by type/text
     * GET /category/:pageNo?type=...&text=...
     */
    getCategoriesPaginated: builder.query({
      query: ({ pageNo, type, text }) => {
        let url = `category/${pageNo}`;
        const params = [];
        if (type) params.push(`type=${encodeURIComponent(type)}`);
        if (text) params.push(`text=${encodeURIComponent(text)}`);
        if (params.length) url += `?${params.join('&')}`;
        return url;
      },
    }),

    /**
     * Get all categories (optionally filtered by branch)
     * GET /category?branch=...
     */
    getCategories: builder.query({
      query: (branchId) => branchId ? `category?branch=${branchId}` : 'category',
    }),

    /**
     * Get categories for selected branches (POST)
     * POST /category/common/selected/branch
     */
    getCategoriesForBranches: builder.mutation({
      query: (body) => ({
        url: 'category/common/selected/branch',
        method: 'POST',
        body,
      }),
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
  useGetCategoriesPaginatedQuery,
  useGetCategoriesQuery,
  useGetCategoriesForBranchesMutation,
  useGetCategoryByIdQuery,
  useGetCategoryBySlugQuery,
  useGetCategoriesWithSubcategoriesQuery,
} = categoriesApi;
