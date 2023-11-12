import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 60)}</p>
      <p>
        <span>
          Author: <PostAuthor userId={post.userId} />
        </span>
      </p>
      <Link to={`post/${post.id}`}> View Post</Link>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
