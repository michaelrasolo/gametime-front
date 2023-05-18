import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { playgroundId: null, date: null, time: null},
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    addPlaygroundId: (state, action) => {
     state.value.playgroundId = action.payload
  },
  addPlaygroundDate: (state,action) => {
    state.value.date = action.payload.date 
  },
  addPlaygroundTime: (state,action) => {
    state.value.time = action.payload.time
  },
    removePlayground: (state, action) => {
    state.value.playgroundId = null
    state.value.date = null 
    state.value.time = null

 },

}});

export const { addPlaygroundId, removePlayground,  addPlaygroundDate,addPlaygroundTime } = playgroundSlice.actions;
export default playgroundSlice.reducer;