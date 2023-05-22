import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value:{ 

    selectedPlayground: { 
        playgroundId: null,
        name:null, 
        address: null,
        city: null,
        date: null,
        time: null}, 
    
    
    playgrounds: []} 
};

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setPlaygroundList: (state, action) => {
     state.value.playgrounds = action.payload
  },
  selectedPlayground:(state, action) => {
    state.value.selectedPlayground = {
      ...state.value.selectedPlayground,
      playgroundId: action.payload.id,
      name: action.payload.name, 
      address: action.payload.address,
      city: action.payload.city    
    }},
    selectDate:(state, action) => {
      state.value.selectedPlayground = {
        ...state.value.selectedPlayground,
        date: action.payload,
      }},
      selectTime:(state, action) => {
        state.value.selectedPlayground = {
          ...state.value.selectedPlayground,
          time: action.payload,
        }},
      emptySelected:(state, action) => {
        state.value.selectedPlayground = {
          playgroundId: null,
          name:null, 
          address: null,
          city: null,
          date: null,
          time: null}},
}});

export const { setPlaygroundList,selectedPlayground, selectDate, selectTime,emptySelected} = playgroundSlice.actions;
export default playgroundSlice.reducer;