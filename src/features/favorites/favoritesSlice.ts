import { createSlice, type  PayloadAction } from "@reduxjs/toolkit"

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

      if (state.items.includes(code)) {
        state.items = state.items.filter((item) => item !== code)
      } else {
        state.items.push(code)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer