import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { emailLogin } from "../../validator/userDetails";
import { Link, Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import AuthUiComponent from "../../ui-components/AuthUiComponent";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth/action";
import LoadingIndicator from "../../ui-components/LoadingIndicator";
interface InitialValues {
  userName: string;
  password: string;
}
const initalState: InitialValues = {
  userName: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const storeContext = useSelector((store: any) => store.AuthReducer);
  const [error, setErrors] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const toast = useToast();
  async function handleSubmit(values: any) {
    setErrors(false);
    try {
      const user = await dispatch<any>(login(values as any));
    } catch (err) {
      toast({
        title: `${err}`,
        status: "error",
        isClosable: true,
      });
      console.log(err);
    }
  }
  const formik = useFormik({
    initialValues: initalState,
    validationSchema: emailLogin,
    onSubmit: handleSubmit,
  });

  if (storeContext.isAuth) return <Navigate to="/" />;
  return (
    <AuthUiComponent>
      <form onSubmit={formik.handleSubmit} className="mt-8">
        {storeContext.isLoading && (
          <div className="relative bottom-24">
            <LoadingIndicator />
          </div>
        )}
        {error && error ? (
          <span className="text-red-600 pl-2 text-sm font-extrabold">
            Please check Email and Password!!
          </span>
        ) : null}
        <div className="space-y-5">
          <div>
            <div className="mt-2 ">
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
            <button
              type="submit"
              className={`inline-flex w-full items-center justify-center rounded-3xl my-5  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80  ${
                storeContext.isLoading
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-[#7BC]"
              }`}
              disabled={storeContext.isLoading}
            >
              {storeContext.isLoading ? "Processing.." : "Login"}
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
    </AuthUiComponent>
  );
};

export default Login;
