import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === "success") {
          const { token, data: userData } = data;
          const user = userData.user;

          if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");
          } else {
            console.error("Invalid response data:", data);
            setError("Invalid password or user not found.");
          }
        } else {
          console.error("Login failed:", data);
          setError("Login failed");
        }
      } else {
        throw new Error(data.message || "Login error");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
          value={userData.email}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
          value={userData.password}
        />
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="form-group mt-3">
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </div>
      <div className="form-group mt-3">
        <p>
          <Link to="/register">Create an account</Link>
        </p>
      </div>
      <div className="form-group mt-3">
        <p>
          <Link to="/reset">Reset password</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
