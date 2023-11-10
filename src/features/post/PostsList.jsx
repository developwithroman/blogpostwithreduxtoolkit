import { useSelector, useDispatch } from "react-redux";
import {
  allPosts,
  fetchPosts,
  getPostError,
  getPostsStatus,
} from "./postSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import { fetchUsers } from "../users/usersSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(allPosts);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const postsStatus = useSelector(getPostsStatus);
  const postsErr = useSelector(getPostError);

  useEffect(
    () => {
      if (postsStatus === "idle") dispatch(fetchPosts());
    },
    [postsStatus, dispatch] //why?
  );
  let content;

  postsStatus === "loading" && (content = <p>Loading...</p>);
  postsStatus === "failed" && (content = <p>{postsErr}...</p>);
  postsStatus === "succeeded" &&
    (content = posts.map((post) => <PostsExcerpt key={post.id} post={post} />));

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
