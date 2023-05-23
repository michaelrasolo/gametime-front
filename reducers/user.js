import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: 'TZzcmZY6tRMB8jxhrlQYFzsnZLLY4iUd', nickname: null, city: null, picture: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nickname = action.payload.nickname;
      state.value.city = action.payload.city
    },
    addPhoto: (state, action) => {
        state.value.picture = action.payload
    },
    removePhoto: (state) => {
        state.value.picture = null
    },
    logout: (state) => {
      state.value.token = null;
      state.value.nickname = null;
      state.value.picture = null;
    },
  },
});

export const { login, logout, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;