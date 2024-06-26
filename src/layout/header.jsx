import { Link, useNavigate } from "react-router-dom";
import '../styles/header.css';

const Header = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    debugger
    navigate("/login")
  }
  return (
    <div className="d-flex justify-content-between top-header align-items-center">
      <div>
        {auth && <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
        </ul>}
      </div>
      <div>
        <ul className="align-items-center">
          <li>
            {auth ? <Link className="primary-btn" onClick={logout} to="/login">Logout</Link> : <Link className="primary-btn" to="/signup">Sign Up</Link> }
          </li>
          <li>
            {!auth && <Link className="primary-btn" to="/login">Login</Link> }
          </li>
          {auth && <li>
            <Link to="/profile">Profile</Link>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default Header