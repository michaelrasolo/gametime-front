import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { gameId: "" },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectGame: (state, action) => {
      state.value.gameId = action.payload;
    },
    releaseGame: (state) => {
      state.value.gameId = null;
    },
  },
});

export const { selectGame, releaseGame } = gameSlice.actions;
export default gameSlice.reducer;
