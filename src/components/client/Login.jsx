import React, { useState } from "react";
import "../../assets/css/frame.min.css";
import "./style/user.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
// import { isAuthenticated, login } from "./Auth/authService";
import { loginValidationSchema } from "./schema/validationSchema";
import { signInWithGoogle } from "./firebase/firebase";
import { server } from "../../server/server";
import Loading from "../../utils/Loading";
import { useDispatch, useSelector } from "react-redux";

import {
  logInSuccess,
  setError,
  setLoading,
} from "../../redux/global/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading());
        dispatch(setError());
        const response = await axios.post("/api/auth/login", values);
        dispatch(setLoading());
        if (response.status === 200) {          
          dispatch(logInSuccess(response.data));
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading());
        dispatch(setError(error.response.data));
      }
    },
  });

  let triggerGoogleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      const loginResp = await axios.post(
        `${server.api}/user/login-with-google`,
        { token: user.accessToken }
      );
      const hello = await axios.get(server.api, {
        headers: {
          Authorization: user,
        },
      });
      console.log(hello);
      console.log(loginResp);
      // localStorage.setItem("token", loginResp.data.token);
      // localStorage.setItem("user", JSON.stringify(loginResp.data.user));
      // setUser(loginResp.data.user)
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="m-0 p-0  user-body h-100">
      <article className="container ">
        <hgroup className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div
              className="card o-hidden border-0 shadow-lg my-5"
              style={{ background: "  #ddd" }}
            >
              <main className="card-body p-0">
                <div className="row">
                  <figure className="col-lg-6 m-0 d-none d-lg-block bg-login-image ">
                    {/* bg-login-image my-section */}
                  </figure>
                  <div className="col-lg-6 p-5">
                    <hgroup className="d-flex justify-content-center user-heading">
                      <h1 className="text-center  h1">BULK MAILER</h1>
                    </hgroup>

                    <header className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Welcome Come Back!
                      </h1>
                    </header>
                    <form className="user" onSubmit={formik.handleSubmit}>
                      {error ? (
                        <div className="alert alert-danger" role="alert">
                          {error.message || "something went wrong"}
                        </div>
                      ):''
                      }
                      <div className="form-group p-0 ">
                        <input
                          className={`form-control form-control-user ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                            {formik.errors.email}
                          </span>
                        )}
                      </div>
                      <div className="form-group p-0">
                        <div>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control form-control-user ${
                              formik.touched.password && formik.errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div>
                            <div className="showPass">
                              {showPassword ? (
                                <span
                                  className="showPassIcon"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <i className="bi bi-eye-slash-fill"></i>
                                </span>
                              ) : (
                                <span
                                  className="showPassIcon"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </span>
                              )}
                            </div>
                          </div>
                          {formik.touched.password &&
                            formik.errors.password && (
                              <span className="d-block ms-3 text-danger small invalid-feedback">
                                {formik.errors.password}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="form-group p-0">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary btn-user btn-block"
                        type="submit"
                      >
                        {loading ? <Loading /> : "LogIn"}
                      </button>
                      <button
                        className="btn btn-google btn-user btn-block text-white"
                        type="button"
                        onClick={triggerGoogleLogin}
                      >
                        <i className="bi bi-google" /> Login with Google
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to={"/forgot-password"}>
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to={"/register"}>
                        Create an Account!
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to={"/reset-password"}>
                        reset-password
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </hgroup>
      </article>
    </div>
  );
};

export default Login;
