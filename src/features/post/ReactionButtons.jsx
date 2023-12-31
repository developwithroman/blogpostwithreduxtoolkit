import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";
const reactionEmojis = {
  thumbsUp: "👍",
  dislike: "👎",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reaction[name]}
      </button>
    )
  );
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
