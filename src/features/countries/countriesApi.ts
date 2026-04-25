import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Country } from "./types"

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1/",
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () =>
        "all?fields=name,capital,region,subregion,population,flags,cca3,languages,currencies",
    }),
    getCountryByCode: builder.query<Country[], string>({
      query: (code: string) => `alpha/${code}`,
    }),
  }),
})

export const { useGetCountriesQuery, useGetCountryByCodeQuery } = countriesApi