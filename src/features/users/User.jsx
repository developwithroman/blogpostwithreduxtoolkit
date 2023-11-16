import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { allPosts } from "../post/postSlice";
import { selectUserById } from "./usersSlice";
const User = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, +userId));
  const userPosts = useSelector((state) => {
    const posts = allPosts(state);
    return posts.filter((post) => post.userId === +userId);
  });
  return (
    <section>
      <h2>{user.name}</h2>
      <ol>
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}> {post.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default User;
