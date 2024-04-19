import React, { useState } from "react";
import { useFormik } from "formik";
import { emailLogin } from "../../validator/userDetails";
import { Link } from "react-router-dom";
import AuthUiComponent from "../../ui-components/AuthUiComponent";
interface InitialValues {
  email: string;
  password: string;
}
const initalState: InitialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(values: any) {
    setErrors(false);
    setLoading(true);

    setLoading(false);
  }
  const formik = useFormik({
    initialValues: initalState,
    validationSchema: emailLogin,
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
                <p className="text-sm font-semibold text-black hover:underline">
                  {" "}
                  Forgot password?{" "}
                </p>
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
              Don't have an account?
              <Link to={"/signup"}>
                <span className="text-[#7BC] pl-2">Sign up</span>
              </Link>
            </p>
          </div>
        </form>
      </form>
    </AuthUiComponent>
  );
};

export default Login;
