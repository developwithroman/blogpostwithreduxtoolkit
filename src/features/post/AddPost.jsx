import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { postAdded } from "./postSlice";
import { allUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setuserId] = useState();
  const users = useSelector(allUsers);
  const navigate = useNavigate();
  const onAuthorChange = (e) => setuserId(e.target.value);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(postAdded(title, description, userId));
      setTitle("");
      setDescription("");
      setuserId("");
      navigate("/");
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
        <select name="users" id="postAuthor" onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;
