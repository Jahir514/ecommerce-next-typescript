import api from '../api/api';

export const offerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get paginated offers with optional search by type/text
     * GET /offer/:pageNo?type=...&text=...
     */
    getOffersPaginated: builder.query({
      query: ({ pageNo, type, text }) => {
        let url = `offer/${pageNo}`;
        const params = [];
        if (type) params.push(`type=${encodeURIComponent(type)}`);
        if (text) params.push(`text=${encodeURIComponent(text)}`);
        if (params.length) url += `?${params.join('&')}`;
        return url;
      },
    }),

    /**
     * Get single offer by ID
     * GET /offer/single/:offerID
     */
    getOfferById: builder.query({
      query: (offerID) => `offer/single/${offerID}`,
    }),

    /**
     * Get all offers for a specific branch
     * GET /offer/branch/list?branch=...
     */
    getOffersByBranch: builder.query({
      query: (branchId) => `offer/branch/list?branch=${branchId}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOffersPaginatedQuery,
  useGetOfferByIdQuery,
  useGetOffersByBranchQuery,
} = offerApi;
