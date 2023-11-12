import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostbyID } from "./postSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { Link, useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const post = useSelector((state) => getPostbyID(state, +id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletePostClicked = () => {
    try {
      dispatch(deletePost({ id: post.id })).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>
        <Link to={`/post/${post.id}/edit`}>Edit Post</Link>
        <button type="button" onClick={deletePostClicked}>
          Delete
        </button>
        <span>
          Author: <PostAuthor userId={post.userId} />
        </span>
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePost;
