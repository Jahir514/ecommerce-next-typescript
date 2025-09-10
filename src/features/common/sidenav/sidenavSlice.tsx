
/**
 * Redux slice for sidenav state management.
 *
 * This slice manages sidebar open/close, active/expanded categories, and selections.
 *
 * Features:
 * - Type safety via TypeScript interfaces
 * - Scalable structure for large applications
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * SidenavState interface
 * Defines the shape of the sidenav slice state.
 */
export interface SidenavState {
	isOpen: boolean;
	activeCategory: string | null;
	activeSubCategory: string | null;
	expandedCategory: string | null;
}

/**
 * Initial state for the sidenav slice.
 */
const initialState: SidenavState = {
	isOpen: false,
	activeCategory: null,
	activeSubCategory: null,
	expandedCategory: null,
};

/**
 * sidenavSlice
 * Contains reducers for managing sidenav state:
 * - toggleSidenav: Toggle open/close state
 * - openSidenav: Open the sidenav
 * - closeSidenav: Close the sidenav
 * - setActiveCategory: Set the active category and reset subcategory
 * - setActiveSubCategory: Set the active subcategory
 * - setExpandedCategory: Set the expanded category
 * - resetSidenavSelections: Reset category/subcategory/expanded selections
 * - resetSidenav: Reset everything to initial state
 */
const sidenavSlice = createSlice({
	name: 'sidenav',
	initialState,
	reducers: {
		/** Toggle open/close state */
		toggleSidenav(state) {
			state.isOpen = !state.isOpen;
		},
		/** Open the sidenav */
		openSidenav(state) {
			state.isOpen = true;
		},
		/** Close the sidenav */
		closeSidenav(state) {
			state.isOpen = false;
		},
		/** Set the active category and reset subcategory */
		setActiveCategory(state, action: PayloadAction<string | null>) {
			state.activeCategory = action.payload;
			state.activeSubCategory = null;
		},
		/** Set the active subcategory */
		setActiveSubCategory(state, action: PayloadAction<string | null>) {
			state.activeSubCategory = action.payload;
		},
		/** Set the expanded category */
		setExpandedCategory(state, action: PayloadAction<string | null>) {
			state.expandedCategory = action.payload;
		},
		/** Reset category/subcategory/expanded selections */
		resetSidenavSelections(state) {
			state.activeCategory = null;
			state.activeSubCategory = null;
			state.expandedCategory = null;
		},
		/** Reset everything to initial state */
		resetSidenav() {
			return initialState;
		},
	},
});

// Export actions for use in components and thunks
export const {
	toggleSidenav,
	openSidenav,
	closeSidenav,
	setActiveCategory,
	setActiveSubCategory,
	setExpandedCategory,
	resetSidenavSelections,
	resetSidenav,
} = sidenavSlice.actions;

// Export reducer for store integration
export default sidenavSlice.reducer;
