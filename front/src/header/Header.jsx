import { Link, useNavigate } from "react-router-dom";
import * as authUtils from "../utils/AuthUtils";
import AdminDash from "../adminDash/AdminDash";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.logout();
    navigate("/login");
  };

  const isLoggedIn = authUtils.isAuthenticated();

  const user = authUtils.getUser();

  console.log(authUtils.getUser());

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          Skelbimu puslapis
        </Link>

        <div>
          {authUtils.isAuthenticated() ? (
            <div className="nav-item dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {authUtils.getUser().username}
              </button>
              <Link to="/addlisting">Add a listing</Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="dropdown-item">{authUtils.getUser().email}</li>
                {authUtils.getUser().role === "admin" && (
                  <li className="dropdown-item">
                    <Link to="/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="dropdown-item" onClick={handleLogout}>
                  Atsijungti
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
              <Link className="btn btn-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
