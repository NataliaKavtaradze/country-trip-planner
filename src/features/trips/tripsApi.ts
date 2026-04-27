import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type Trip = {
  id: string
  title: string
  countries: string[]
  createdAt: string
}

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Trips"],
  endpoints: (builder) => ({
    getTrips: builder.query<Trip[], void>({
      query: () => "/trips",
      providesTags: ["Trips"],
    }),

    saveTrip: builder.mutation<Trip, Omit<Trip, "id">>({
      query: (trip) => ({
        url: "/trips",
        method: "POST",
        body: trip,
      }),
      invalidatesTags: ["Trips"],
    }),

    deleteTrip: builder.mutation<void, string>({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
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