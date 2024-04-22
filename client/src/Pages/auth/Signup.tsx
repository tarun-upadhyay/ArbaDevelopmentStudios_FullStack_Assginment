import React, { useState } from "react";
import AuthUiComponent from "../../ui-components/AuthUiComponent";
import { useFormik } from "formik";
import { emailSignup } from "../../validator/userDetails";
import { Link, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as types from "../../Redux/Auth/actionTypes";
import { useDispatch, useSelector } from "react-redux";
interface InitialValues {
  email: string;
  password: string;
  userName: string;
  fullName: string;
  confirmPassword: string;
}
const initalState: InitialValues = {
  email: "",
  userName: "",
  fullName: "",
  password: "",
  confirmPassword: "",
};
const Signup = () => {
  const [error, setErrors] = useState("");
  const storeContext = useSelector((store: any) => store.AuthReducer);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordVisible2, setPasswordVisible2] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(values: any) {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.msg);
        throw new Error("Failed to register");
      }
      setLoading(false);
      dispatch({ type: types.SIGNUP_SUCCESS, payload: data.user });
    } catch (error: any) {
      setLoading(false);
      dispatch({ type: types.SIGNUP_FAILURE, payload: error.message });
    }

    console.log(error);
  }
  const formik = useFormik({
    initialValues: initalState,
    validationSchema: emailSignup,
    onSubmit: handleSubmit,
  });
  if (storeContext.isAuth) return <Navigate to="/" />;
  return (
    <AuthUiComponent>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        {error && error ? (
          <span className="text-red-600 pl-2 text-sm font-extrabold">
            {error}
          </span>
        ) : null}
        <div className="space-y-5">
          <div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Username"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
              ></input>
              {formik.errors.userName && formik.touched.userName && (
                <span className="text-red-600 pl-2 text-sm">
                  {formik.errors.userName}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Fullname"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
              ></input>
              {formik.errors.fullName && formik.touched.fullName && (
                <span className="text-red-600 pl-2 text-sm">
                  {formik.errors.fullName}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mt-2 ">
              <input
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              ></input>
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-600 pl-2 text-sm">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between"></div>
            <div className="mt-2">
              <label htmlFor="" className="relative flex">
                <input
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                  type={`${passwordVisible ? "text" : "password"}`}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                ></input>
                {passwordVisible ? (
                  <FaEye
                    className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              </label>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-600 pl-2 text-sm">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mt-2 ">
              <label htmlFor="" className="relative flex">
                <input
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                  type={`${passwordVisible2 ? "text" : "password"}`}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                ></input>
                {passwordVisible2 ? (
                  <FaEye
                    className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]"
                    onClick={() => setPasswordVisible2(!passwordVisible2)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]"
                    onClick={() => setPasswordVisible2(!passwordVisible2)}
                  />
                )}
              </label>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <span className="text-red-600 pl-2 text-sm">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`inline-flex w-full items-center justify-center rounded-3xl my-3  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80  ${
                loading
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-[#7BC]"
              }`}
              disabled={loading}
            >
              {loading ? "Processing.." : "Signup"}
            </button>
          </div>
          <p className="pl-1 font-normal mt-2">
            Already have an account?
            <Link to={"/login"}>
              <span className="text-[#7BC] pl-2">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </AuthUiComponent>
  );
};

export default Signup;
