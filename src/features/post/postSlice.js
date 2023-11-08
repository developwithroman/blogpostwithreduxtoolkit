import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  { id: 1, title: "Ttile 1", description: "consnte tnions nteions " },
  { id: 2, title: "Ttile 2", description: "consnte tnions nteions " },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const allPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
