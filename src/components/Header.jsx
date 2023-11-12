import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="Header">
      <h2>Redux Blog</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="post">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
