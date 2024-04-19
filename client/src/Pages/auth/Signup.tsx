import React, { useState } from "react";
import AuthUiComponent from "../../ui-components/AuthUiComponent";
import { useFormik } from "formik";
import { emailSignup } from "../../validator/userDetails";
import { Link } from "react-router-dom";
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
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(values: any) {
    setErrors(false);
    setLoading(true);

    setLoading(false);
  }
  const formik = useFormik({
    initialValues: initalState,
    validationSchema: emailSignup,
    onSubmit: handleSubmit,
  });
  return (
    <AuthUiComponent>
      <form action="">
        <form onSubmit={formik.handleSubmit} className="mt-8">
          {error && error ? (
            <span className="text-red-600 pl-2 text-sm font-extrabold">
              Please check Email and Password!!
            </span>
          ) : null}
          <div className="space-y-5 font-baijam font-bold">
            <div>
              <label
                htmlFor=""
                className="text-base word-spacing-2 text-gray-900"
              >
                {" "}
                Username{" "}
              </label>
              <div className="mt-2 ">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
              <label
                htmlFor=""
                className="text-base word-spacing-2 text-gray-900"
              >
                {" "}
                Fullname{" "}
              </label>
              <div className="mt-2 ">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
              <label
                htmlFor=""
                className="text-base word-spacing-2 text-gray-900"
              >
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2 ">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base word-spacing-2 text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.password && formik.touched.password && (
                  <span className="text-red-600 pl-2 text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className="text-base word-spacing-2 text-gray-900"
              >
                {" "}
                Confirm Password{" "}
              </label>
              <div className="mt-2 ">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                ></input>
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
                className={`inline-flex w-full items-center justify-center rounded-3xl  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80  ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-[#7BC]"
                }`}
                disabled={loading}
              >
                {loading ? "Processing.." : "Login"}
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
      </form>
    </AuthUiComponent>
  );
};

export default Signup;
