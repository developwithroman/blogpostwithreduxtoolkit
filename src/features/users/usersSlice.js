import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get(USERS_URL);
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const allUsers = (state) => state.users;
export const selectUserById = (state, userID) =>
  state.users.find((user) => user.id === userID);
export default usersSlice.reducer;
