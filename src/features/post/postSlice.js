import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts: [],
  status: "idle", // 'succeeded',
  error: null,
};
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const { data } = await axios.get(POST_URL);
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const loadedPosts = action.payload.map((post) => {
          post.reactions = { thumbsUp: 0, dislike: 0 };
          return post;
        });
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
