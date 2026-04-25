import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type TripsState = {
  plannerOpen: boolean
  savedTripsOpen: boolean
  selectedCountries: string[]
}

const initialState: TripsState = {
  plannerOpen: false,
  savedTripsOpen: false,
  selectedCountries: [],
}

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setPlannerOpen: (state, action: PayloadAction<boolean>) => {
      state.plannerOpen = action.payload
    },
    setSavedTripsOpen: (state, action: PayloadAction<boolean>) => {
      state.savedTripsOpen = action.payload
    },
    addCountryToTrip: (state, action: PayloadAction<string>) => {
      if (!state.selectedCountries.includes(action.payload)) {
        state.selectedCountries.push(action.payload)
      }
    },
    removeCountryFromTrip: (state, action: PayloadAction<string>) => {
      state.selectedCountries = state.selectedCountries.filter(
        (code) => code !== action.payload
      )
    },
    clearTrip: (state) => {
      state.selectedCountries = []
    },
  },
})

export const {
  setPlannerOpen,
  setSavedTripsOpen,
  addCountryToTrip,
  removeCountryFromTrip,
  clearTrip,
} = tripsSlice.actions

export default tripsSlice.reducer