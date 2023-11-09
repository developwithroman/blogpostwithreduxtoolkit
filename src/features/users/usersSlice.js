import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Roman Karki",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const allUsers = (state) => state.users;

export default usersSlice.reducer;
