import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getPostbyID, postAdded, updatePost } from "./postSlice";
import { allUsers } from "../users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const post = useSelector((state) => getPostbyID(state, +id));
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.body);
  const [userId, setuserId] = useState(post?.userId);
  const users = useSelector(allUsers);

  const onAuthorChange = (e) => setuserId(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      try {
        dispatch(
          updatePost({
            id,
            title,
            body: description,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setDescription("");
        setuserId(null);
        navigate(`/post/${id}`);
      } catch (error) {
        console.error("Failed to update the post", error);
      }
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="field-label">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="field-label">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="field-label">User:</label>
        <select
          name="users"
          id="postAuthor"
          onChange={onAuthorChange}
          defaultValue={userId}
        >
          <option value=""></option>
          {userOptions}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EditPost;
