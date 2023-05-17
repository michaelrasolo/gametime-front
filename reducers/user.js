import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, password: null, nickname: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nickname = action.payload.nickname;
      state.value.password = action.payload.password;
      state.value.nickname = action.payload.nickname;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.nickname = null;
      state.value.password = null;
      state.value.nickname = null
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;