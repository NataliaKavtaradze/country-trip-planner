import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type CountriesState = {
  search: string
  region: string
  favoritesOnly: boolean
  selectedCountry: string | null
  isModalOpen: boolean
}

const initialState: CountriesState = {
  search: "",
  region: "All",
  favoritesOnly: false,
  selectedCountry: null,
  isModalOpen: false,
}

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload
    },
    toggleFavoritesOnly: (state) => {
      state.favoritesOnly = !state.favoritesOnly
    },
    setSelectedCountry: (state, action: PayloadAction<string | null>) => {
      state.selectedCountry = action.payload
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
  },
})

export const {
  setSearch,
  setRegion,
  toggleFavoritesOnly,
  setSelectedCountry,
  setModalOpen,
} = countriesSlice.actions

export default countriesSlice.reducer