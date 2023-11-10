import "./App.css";
import PostsList from "./features/post/PostsList";
import AddPost from "./features/post/AddPost";

function App() {
  return (
    <main className="App">
      <AddPost />
      <hr />
      <PostsList />
    </main>
  );
}

export default App;
