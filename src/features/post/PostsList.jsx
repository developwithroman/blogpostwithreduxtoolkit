import { useSelector } from "react-redux";
import { allPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";

const PostsList = () => {
  const posts = useSelector(allPosts);

  console.log("posts", posts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.description.substring(0, 100)}</p>
      <p>
        <span>
          Author: <PostAuthor userId={post.user_id} />
        </span>
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
