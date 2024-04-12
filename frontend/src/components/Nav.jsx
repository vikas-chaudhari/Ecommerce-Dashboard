import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  function logout() {
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <div className="Nav">
      <img className="logo" src={logo} alt="logo" />

      {auth ? (
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>{/* <Link to="/update">Update Product</Link> */}</li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout
            </Link>
            {/* <h4>({JSON.parse(auth).name})</h4> */}
          </li>
        </ul>
      ) : (
        <ul className="login_signup">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
