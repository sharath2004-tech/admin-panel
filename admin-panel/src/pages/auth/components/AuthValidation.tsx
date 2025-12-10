import * as Yup from "yup";

export const forgotValidation = Yup.object().shape({
  email: Yup.string().email().required("email is required"),
});

export const otpValidation = Yup.object().shape({
  code: Yup.number().min(6).required("otp code is required"),
});

export const passwordValidation = Yup.object().shape({
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
