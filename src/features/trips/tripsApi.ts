import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Trips"],
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: () => "trips",
      providesTags: ["Trips"],
    }),
    saveTrip: builder.mutation({
      query: (trip) => ({
        url: "trips",
        method: "POST",
        body: trip,
      }),
      invalidatesTags: ["Trips"],
    }),
  }),
})

export const { useGetTripsQuery, useSaveTripMutation } = tripsApi