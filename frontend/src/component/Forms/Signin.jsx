import { useState } from "react";
import apiRequest from "../../services/api";
import { authenticate, isAdmin, isAuthenticated } from "../../utils/auth";
import { Navigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    apiRequest("POST", "/user/signin", { email, password })
      .then((data) => {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
        dispatch(setUser(data));
      })
      .catch(() =>
        setValues({ ...values, error: "Something went wrong", loading: false })
      );
  };

  const performRedirect = () => {
    if (didRedirect && isAuthenticated() && isAdmin()) {
      return <Navigate to={"/admin"} replace={true} />;
    }
    if (didRedirect && isAuthenticated()) {
      return <Navigate to={"/user"} replace={true} />;
    }
  };

  const loadingMessage = () => {
    return loading && toast("Welcome ");
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="container justify-content-center align-items-center border">
        <div className="row m-5">
          <div className="col-md-6 offset-sm-3 text-left">
            <form action="">
              <div className="form-group mt-1">
                <label htmlFor="email" className="text-dark">
                  Email
                </label>
                <input
                  onChange={handleChange("email")}
                  className="form-control"
                  value={email}
                  type="email"
                  id="email"
                />
              </div>
              <div className="form-group mt-1">
                <label htmlFor="password" className="text-dark">
                  Password
                </label>
                <input
                  onChange={handleChange("password")}
                  className="form-control"
                  value={password}
                  type="password"
                  id="password"
                />
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-success btn-block mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </>
  );
};

export default Signin;
