import { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { postAdded } from "./postSlice";
import { allUsers } from "../users/usersSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setuserId] = useState();
  const users = useSelector(allUsers);

  const onAuthorChange = (e) => setuserId(e.target.value);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(postAdded(title, description, userId));
      setTitle("");
      setDescription("");
      setuserId(null);
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        User:
        <select name="users" id="postAuthor" onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;
