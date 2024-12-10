import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "styled-components";
import { useState } from "react";
import { login } from "../../services/apiService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const theme = useTheme();

  const validationSchema = Yup.object({
    userId: Yup.string().required("User Id is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: { userId: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log("Form Data:", values);
    if (values.userId && values.password) {
      await handleLogin(values.userId, values.password);
    }
    setSubmitting(false);
  };

  const handleLogin = async (userId: any, password: any) => {
    setIsLoading(true);
    try {
      const response = await login(userId, password);
      console.log("response-response-response", response);
      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("facilityId", response.data.facilityid)
        localStorage.setItem("facilityname", response.data.facilityname)
        localStorage.setItem("role", response.data.role)
        localStorage.setItem("username", response.data.username)
        navigate("/dashboard")
        
      } else {
        console.log(
          response?.data?.message || "Something went wrong. Please try again"
        );
        toast(
          response?.data?.message || "Something went wrong. Please try again",
          {
            style: { backgroundColor: "red", color: "white" },
          }
        );
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        toast(error.response.data.message, {
          style: { backgroundColor: "red", color: "white" },
        });
      } else {
        console.log("Something went wrong. Please try again.");
        toast("Something went wrong. Please try again.", {
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="row " style={{ height: "100vh" }}>
        <div
          className="d-none d-lg-flex col-lg-7 col-xl-7 px-5 py-3"
          style={{
            background:
              "linear-gradient(rgb(196, 163, 250), rgb(236, 236, 248), rgb(197, 211, 241))",
          }}
        >
          <div className="col-lg-1"></div>
          <div className="w-100 d-flex justify-content-center py-3 align-items-center">
            <img
              src="park.png"
              //   src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/boy-with-rocket-light.png"
              className="img-fluid"
              alt="Login image"
              width="700"
              data-app-dark-img="illustrations/boy-with-rocket-dark.png"
              data-app-light-img="illustrations/boy-with-rocket-light.png"
            />
          </div>
        </div>
        <div className="d-flex col-12 col-lg-5 col-xl-5 justify-content-center align-items-center authentication-bg p-sm-12 p-6">
          <div className="">
            <h4 className="mb-2 text-center">Welcome to EazyPark! 👋</h4>
            <p className="mb-4">
              Please sign-in to your account and start the adventure
            </p>

            <Formik
              initialValues={{ userId: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form id="formAuthentication" className="mb-3">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      User Id
                    </label>
                    <Field
                      type="text"
                      name="userId"
                      id="userId"
                      className="form-control"
                      placeholder="Enter your User Id"
                      autoFocus
                    />
                    <ErrorMessage
                      name="userId"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <div className="input-group input-group-merge">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter Passsord"
                        autoComplete="true"
                        aria-describedby="password"
                      />
                      {/* <span className="input-group-text cursor-pointer"></span> */}
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        id="remember-me"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <button
                      aria-label="Click me"
                      className="btn d-grid w-100"
                      style={{
                        backgroundColor: theme.color.primary,
                        color: theme.text_color.primary,
                      }}
                      type="submit"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? "Signing in..." : "Login "}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="text-center">
              {/* <Link aria-label="Go to Register Page" to='/auth/register' className="registration-link">
                            <span>Create an account</span>
                        </Link> */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
