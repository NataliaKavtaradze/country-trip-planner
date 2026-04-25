import { configureStore } from "@reduxjs/toolkit"
import { countriesApi } from "../features/countries/countriesApi"
import { tripsApi } from "../features/trips/tripsApi"
import countriesReducer from "../features/countries/countriesSlice"
import favoritesReducer from "../features/favorites/favoritesSlice"
import tripsReducer from "../features/trips/tripsSlice"

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favorites: favoritesReducer,
    trips: tripsReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware, tripsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch