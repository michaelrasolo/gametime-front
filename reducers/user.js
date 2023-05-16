import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, password: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.username;
      state.value.password = action.payload.password;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;