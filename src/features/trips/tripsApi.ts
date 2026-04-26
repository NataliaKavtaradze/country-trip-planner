import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Trip } from "./types"

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Trips"],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      query: () => "trips",
      providesTags: ["Trips"],
    }),
    deleteTrip: builder.mutation<void, string>({
  query: (id) => ({
    url: `/trips/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Trips"],
}),

    saveTrip: builder.mutation<Trip, Omit<Trip, "id">>({
      query: (trip) => ({
        url: "trips",
        method: "POST",
        body: {
          ...trip,
          id: crypto.randomUUID(),
        },
      }),
      invalidatesTags: ["Trips"],
    }),
  }),
})

export const {
  useGetTripsQuery,
  useSaveTripMutation,
  useDeleteTripMutation,
} = tripsApi