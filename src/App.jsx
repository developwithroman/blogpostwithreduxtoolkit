import "./App.css";
import PostsList from "./features/post/PostsList";
import AddPost from "./features/post/AddPost";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./features/post/SinglePost";
import EditPost from "./features/post/EditPost";

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
      </Route>
    </Routes>
  );
}

export default App;
