// RTK Query API for locations

import api from '../api/api';


/**
 * RTK Query API for locations, matching backend branch GET routes.
 */
export const locationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get all branches for frontend (inactiveInEcommerce != true)
     * GET /branch
     */
    getBranches: builder.query({
      query: () => 'branch',
    }),

    /**
     * Get paginated branches (with optional search)
     * GET /branch/:pageNo?text=...&type=...
     */
    getBranchesPaginated: builder.query({
      query: ({ pageNo, text, type }) => {
        let url = `branch/${pageNo}`;
        const params = [];
        if (text) params.push(`text=${encodeURIComponent(text)}`);
        if (type) params.push(`type=${encodeURIComponent(type)}`);
        if (params.length) url += `?${params.join('&')}`;
        return url;
      },
    }),

    /**
     * Get branch by ID
     * GET /branch/data/:branchID
     */
    getBranchById: builder.query({
      query: (branchID) => `branch/data/${branchID}`,
    }),

    /**
     * Get branch by name (division.name)
     * GET /branch/name/:branchName
     */
    getBranchByName: builder.query({
      query: (branchName) => `branch/name/${encodeURIComponent(branchName)}`,
    }),

    /**
     * Get all branches except specific branch
     * GET /branch/expect/specific/:branchID
     */
    getBranchesExcept: builder.query({
      query: (branchID) => `branch/expect/specific/${branchID}`,
    }),

    /**
     * Get all divisions (unique)
     * GET /branch/change/division
     */
    getDivisions: builder.query({
      query: () => 'branch/change/division',
    }),

    /**
     * Get all districts of a division
     * GET /branch/change/:divisionID/district
     */
    getDistrictsByDivision: builder.query({
      query: (divisionID) => `branch/change/${divisionID}/district`,
    }),

    /**
     * Get all thanas of a district
     * GET /branch/change/:districtID/thana
     */
    getThanasByDistrict: builder.query({
      query: (districtID) => `branch/change/${districtID}/thana`,
    }),

    /**
     * Get all branches of a thana
     * GET /branch/change/:thanaID/branches
     */
    getBranchesByThana: builder.query({
      query: (thanaID) => `branch/change/${thanaID}/branches`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBranchesQuery,
  useGetBranchesPaginatedQuery,
  useGetBranchByIdQuery,
  useGetBranchByNameQuery,
  useGetBranchesExceptQuery,
  useGetDivisionsQuery,
  useGetDistrictsByDivisionQuery,
  useGetThanasByDistrictQuery,
  useGetBranchesByThanaQuery,
} = locationsApi;
