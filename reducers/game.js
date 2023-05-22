import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    gameId: null,
    playgroundName: null,
    playgroundAddress: null,
    playgroundCity: null,
    playgroundPostCode: null,
    gameType: null,
    gameLevel: null,
    gameMood: null,
    participants: null,
    maxParticipants: null,
},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectGame: (state, action) => {
        state.value.gameId= action.payload.gameId,
        state.value.playgroundName= action.payload.playgroundName,
        state.value.playgroundAddress= action.payload.playgroundAddress,
        state.value.playgroundCity= action.payload.playgroundCity,
        state.value.playgroundPostCode= action.payload.playgroundPostCode,
        state.value.gameType= action.payload.gameType,
        state.value.gameLevel= action.payload.gameLevel,
        state.value.gameMood= action.payload.gameMood,
        state.value.participants= action.payload.participants,
        state.value.maxParticipants= action.payload.maxParticipants

    },
    releaseGame: (state) => {
        state.value.gameId= null,
        state.value.playgroundName= null,
        state.value.playgroundAddress= null,
        state.value.playgroundCity= null,
        state.value.playgroundPostCode= null,
        state.value.gameType= null,
        state.value.gameLevel= null,
        state.value.gameMood= null,
        state.value.participants= null,
        state.value.maxParticipants= null
    }
  },
});

export const {selectGame, releaseGame} = gameSlice.actions;
export default gameSlice.reducer;