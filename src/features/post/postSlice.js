import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  {
    id: 1,
    title: "Ttile 1",
    description: "consnte tnions nteions ",
    user_id: 0,
    reaction: {
      thumbsUp: 0,
      dislike: 0,
    },
  },
  {
    id: 2,
    title: "Ttile 2",
    description: "consnte tnions nteions ",
    user_id: 1,
    reaction: {
      thumbsUp: 0,
      dislike: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, description, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            user_id: userId,
            reaction: {
              thumbsUp: 0,
              dislike: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reaction[reaction]++;
      }
    },
  },
});

// simplest way to create the slice
// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     postAdded(state, action) {
//       state.push(action.payload);
//     },
//   },
// });

export const allPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
