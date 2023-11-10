import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  {
    id: 1,
    title: "React Tutorial by LF Technologies",
    description:
      "Welcome to Leapfrog Technology, where innovation and collaboration thrive! We're thrilled to have you join our dynamic team, and we extend a warm welcome to you as you embark on this exciting journey with us. ",
    user_id: 0,
    reaction: {
      thumbsUp: 0,
      dislike: 0,
    },
  },
  {
    id: 2,
    title: "Company Onboarding Orientation",
    description:
      "Please know that our doors are always open, and People Management is here to support you every step of the way, so never hesitate to reach out if you have any questions, whether big or small and together, we'll continue to push the boundaries of what's possible. ",
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
      const existingPost = state.find((post) => post.id === postId);
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
