import * as Yup from "yup";

export const emailLogin = Yup.object({
  password: Yup.string().min(6).required("Please enter your password"),
  email: Yup.string().email().required("Please enter your email"),
});

export const emailSignup = Yup.object({
  userName: Yup.string().min(3).max(50).required("Please enter your userName"),
  fullName: Yup.string().min(3).max(50).required("Please enter your fullName"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});
