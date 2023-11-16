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
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const { id } = post;
  try {
    const { data } = await axios.put(`${POST_URL}/${id}`, post);
    console.log(data);
    return data;
  } catch (error) {
    return error.message;
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (ip) => {
  const { id } = ip;
  try {
    const { status, statusText } = await axios.delete(`${POST_URL}/${id}`);
    console.info("Deleted successfully", id);
    if (status == 200) return ip;
    return `${status}:${statusText}`;
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
            body: description,
            user_id: userId,
            reactions: {
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
        existingPost.reactions[reaction]++;
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
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.error("Delete could not be completed");
          console.error(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((p) => p.id !== id);
        state.posts = posts;
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getPostbyID = (state, post_id) =>
  state.posts.posts.find((post) => post.id === post_id);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
