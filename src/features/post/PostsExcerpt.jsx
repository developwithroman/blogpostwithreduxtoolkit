import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p>
        <span>
          Author: <PostAuthor userId={post.userId} />
        </span>
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
