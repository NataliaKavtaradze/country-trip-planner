import { createSlice } from "@reduxjs/toolkit"

const tripsSlice = createSlice({
  name: "trips",
  initialState: {
    plannerOpen: false,
    selectedCountries: [] as string[],
  },
  reducers: {},
})

export default tripsSlice.reducer