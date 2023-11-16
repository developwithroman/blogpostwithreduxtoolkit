import "./App.css";
import PostsList from "./features/post/PostsList";
import AddPost from "./features/post/AddPost";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./features/post/SinglePost";
import EditPost from "./features/post/EditPost";
import Users from "./features/users/Users";
import User from "./features/users/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPost />} />
          <Route path=":id" element={<SinglePost />} />
          <Route path=":id/edit" element={<EditPost />} />
        </Route>
        <Route path="users">
          <Route index element={<Users />} />
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
