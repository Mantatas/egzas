import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === "success") {
          navigate("/login");
        }
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          onChange={handleChange}
          value={userData.username}
        />
      </div>
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
      <div className="form-group mt-3">
        <label htmlFor="passwordConfirm">Repeat Password</label>
        <input
          type="password"
          name="passwordConfirm"
          className="form-control"
          onChange={handleChange}
          value={userData.passwordConfirm}
        />
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <div className="form-group mt-3">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
      <div className="form-group mt-3">
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
