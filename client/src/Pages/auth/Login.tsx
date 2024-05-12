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
    } catch (err: any) {
      toast({
        title: `${err.message}`,
        status: "error",
        isClosable: true,
      });
      console.error(err);
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
        {error && error ? (
          <span className="text-red-600 pl-2 text-sm font-extrabold">
            Please check Email and Password!!
          </span>
        ) : null}
        <div className="space-y-5">
          <div>
            <div className="mt-2 ">
              <input
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-600   disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-600   disabled:cursor-not-allowed disabled:opacity-50"
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
              {storeContext.isLoading ? (
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Login"
              )}
            </button>
            <button>
              {/* <Link
                to="http://localhost:5000/auth/callback/google"
                target="_blank"
              >
                Login With Google
              </Link> */}
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
