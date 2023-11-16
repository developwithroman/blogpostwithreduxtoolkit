import { useSelector } from "react-redux";
import { allUsers } from "./usersSlice";
import { Link } from "react-router-dom";
const Users = () => {
  const users = useSelector(allUsers);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
