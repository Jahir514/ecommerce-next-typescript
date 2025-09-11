import { createSlice } from "@reduxjs/toolkit";
import { offerApi } from "./offerApi";

export interface OfferState {
	offers: any[];
	largeOffers: any[];
	smallOffers: any[];
	loading: boolean;
	error: string | null;
}


const initialState: OfferState = {
	offers: [],
	largeOffers: [],
	smallOffers: [],
	loading: false,
	error: null,
};

const offerSlice = createSlice({
	name: "offer",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				offerApi.endpoints.getOffersByBranch.matchPending,
				(state) => {
					state.loading = true;
					state.error = null;
				}
			)
			.addMatcher(
				offerApi.endpoints.getOffersByBranch.matchFulfilled,
				(state, action) => {
					state.loading = false;
					state.offers = action.payload?.data || [];
					// Filter offers by device type
					state.largeOffers = state.offers.filter((offer: any) => offer.device === "large");
					state.smallOffers = state.offers.filter((offer: any) => offer.device === "small");
					state.error = null;
				}
			)
			.addMatcher(
				offerApi.endpoints.getOffersByBranch.matchRejected,
				(state, action) => {
					state.loading = false;
					state.error = action.error?.message || "Failed to fetch offers.";
				}
			);
	},
});

export default offerSlice.reducer;
