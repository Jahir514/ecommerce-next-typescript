
/**
 * Redux slice for categories state management.
 *
 * This slice manages product categories, loading/error states, and branch selection for category-related features.
 *
 * Features:
 * - Type safety via TypeScript interfaces
 * - Error message handling for robust error reporting
 * - Scalable structure for large applications
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesApi } from "./categoriesApi";

/**
 * CategoriesState interface
 * Defines the shape of the categories slice state.
 */
export interface CategoriesState {
  productCategoryData: any[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  branchId: string | null;
}

/**
 * Initial state for the categories slice.
 */
const initialState: CategoriesState = {
  productCategoryData: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  branchId: null,
};

/**
 * categoriesSlice
 * Contains reducers for managing categories state:
 * - setProductCategoryData: Set the product category data array
 * - setBranchId: Set the selected branch ID
 * - fetchCategories: Set loading state when fetching categories
 * - fetchCategoriesSuccess: Store fetched categories and reset error/loading
 * - fetchCategoriesError: Set error state and store error message
 * - clearError: Reset error state and message
 */
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    /**
     * Set the product category data array.
     */
    setProductCategoryData(state, action: PayloadAction<any[]>) {
      state.productCategoryData = action.payload;
    },
    /**
     * Set the selected branch ID.
     */
    setBranchId(state, action: PayloadAction<string | null>) {
      state.branchId = action.payload;
    },
    /**
     * Set loading state when fetching categories.
     */
    fetchCategories(state) {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    /**
     * Store fetched categories and reset error/loading states.
     */
    fetchCategoriesSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.productCategoryData = action.payload;
      state.isError = false;
      state.errorMessage = null;
    },
    /**
     * Set error state and store error message when fetching categories fails.
     */
    fetchCategoriesError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || "Failed to fetch categories.";
    },
    /**
     * Reset error state and message.
     */
    clearError(state) {
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle category product with RTK Query
      .addMatcher(
        categoriesApi.endpoints.getCategoriesPaginated.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        categoriesApi.endpoints.getCategoriesPaginated.matchFulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.productCategoryData = action.payload;
          state.isError = false;
          state.errorMessage = null;
        }
      )
      .addMatcher(
        categoriesApi.endpoints.getCategoriesPaginated.matchRejected,
        (state, action: any) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.error?.message || "Failed to load categories.";
        }
      );
  },
});

export const {
  setProductCategoryData,
  setBranchId,
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesError,
  clearError,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
