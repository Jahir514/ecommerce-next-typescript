
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
  categoryWithSubcategory: any[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  branchId: string | null;
}

/**
 * Initial state for the categories slice.
 */
const initialState: CategoriesState = {
  categoryWithSubcategory: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle branch-wise category with subcategory data from RTK Query
      .addMatcher(
        categoriesApi.endpoints.getCategoriesWithSubcategories.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        categoriesApi.endpoints.getCategoriesWithSubcategories.matchFulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.categoryWithSubcategory = action.payload;
          state.isError = false;
          state.errorMessage = null;
        }
      )
      .addMatcher(
        categoriesApi.endpoints.getCategoriesWithSubcategories.matchRejected,
        (state, action: any) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.error?.message || "Failed to load categories.";
        }
      );
  },
});

// No reducer actions to export; all state is managed by RTK Query extraReducers
export default categoriesSlice.reducer;
