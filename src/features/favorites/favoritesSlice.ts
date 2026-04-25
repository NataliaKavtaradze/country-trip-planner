import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type FavoritesState = {
  items: string[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const code = action.payload
      const exists = state.items.includes(code)

      state.items = exists
        ? state.items.filter((item) => item !== code)
        : [...state.items, code]
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer