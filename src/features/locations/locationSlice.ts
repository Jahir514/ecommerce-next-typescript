

/**
 * Redux slice for location state management.
 *
 * This slice manages branches, area selection, branch selection, and loading/error states for location-related features.
 *
 * Features:
 * - Type safety via TypeScript interfaces
 * - Error message handling for robust error reporting
 * - Scalable structure for large applications
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


/**
 * Branch interface
 * Represents a branch entity in the location state.
 */
export interface Branch {
  id: string;
  name: string;
  // Add more branch properties as needed
}


/**
 * LocationState interface
 * Defines the shape of the location slice state.
 */
export interface LocationState {
  branches: Branch[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  selectedArea: string;
  branchId: string;
  selectedBranch: Branch | null;
}


/**
 * Initial state for the location slice.
 */
const initialState: LocationState = {
  branches: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  selectedArea: '',
  branchId: '',
  selectedBranch: null,
};



/**
 * locationSlice
 * Contains reducers for managing location state:
 * - setSelectedArea: Set the selected area string
 * - setBranchId: Set the selected branch ID
 * - setSelectedBranch: Set the selected branch object
 * - fetchBranches: Set loading state when fetching branches
 * - fetchBranchesSuccess: Store fetched branches and reset error/loading
 * - fetchBranchesError: Set error state and store error message
 */
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    /**
     * Set the selected area string.
     */
    setSelectedArea(state, action: PayloadAction<string>) {
      state.selectedArea = action.payload;
    },
    /**
     * Set the selected branch ID.
     */
    setBranchId(state, action: PayloadAction<string>) {
      state.branchId = action.payload;
    },
    /**
     * Set the selected branch object.
     */
    setSelectedBranch(state, action: PayloadAction<Branch | null>) {
      state.selectedBranch = action.payload;
    },
    /**
     * Set loading state when fetching branches.
     */
    fetchBranches(state) {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    },
    /**
     * Store fetched branches and reset error/loading states.
     */
    fetchBranchesSuccess(state, action: PayloadAction<Branch[]>) {
      state.isLoading = false;
      state.branches = action.payload;
      state.isError = false;
      state.errorMessage = null;
    },
    /**
     * Set error state and store error message when fetching branches fails.
     */
    fetchBranchesError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || 'Failed to fetch branches.';
    },
  },
});


// Export actions for use in components and thunks
export const {
  setSelectedArea,
  setBranchId,
  setSelectedBranch,
  fetchBranches,
  fetchBranchesSuccess,
  fetchBranchesError,
} = locationSlice.actions;

// Export reducer for store integration
export default locationSlice.reducer;
