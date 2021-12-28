import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";

const AuthBox = ({ register }) => {
  const { getCurrentUser, user } = useGlobalContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      data = {
        email,
        password,
        name,
        confirmPassword,
      };
    } else {
      data = {
        email,
        password,
      };
    }

    axios
      .post(register ? "api/auth/register" : "/api/auth/login", data)
      .then((res) => {
        if (res?.data?.user) {
          getCurrentUser();
        }
      })
      .catch((err) => {
        setLoading(false);

        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        {register && (
          <div className="auth__field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && <p className="auth__error">{errors.name}</p>}
          </div>
        )}

        <div className="auth__field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && <p className="auth__error">{errors.email}</p>}
        </div>

        <div className="auth__field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <p className="auth__error">Something went wrong</p> */}
          {errors.password && <p className="auth__error">{errors.password}</p>}
        </div>

        {register && (
          <div className="auth__field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errors.confirmPassword && (
              <p className="auth__error">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <div className="auth__footer">
          {Object.keys(errors).length > 0 && (
            <p className="auth__error">
              {register ? "You have some validation errors" : errors.error}
            </p>
          )}

          <button className="btn" onClick={onSubmit} disabled={loading}>
            {register ? "Register" : "Login"}
          </button>

          {!register && (
            <div className="auth__register">
              <p>
                Not a member? <Link to="/register">Register now</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
