import React from "react";
import { Formik, Form } from "formik";
import {
  forgotValidation,
  otpValidation,
  passwordValidation,
} from "./components/AuthValidation";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import ReactCodeInput from "react-code-input";
import PasswordInput from "@/lib/ui/PasswordInput";
import useDynamicMutation from "@/hooks/usePostData";
import { getHeaders } from "@/config/apiConfig";
import * as z from "zod";
import {
  forgotPasswordSchema,
  otpSchema,
  newPasswordSchema,
} from "@/validation/auth";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { ButtonLoader } from "@/constants/Loader";

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
type OtpValues = z.infer<typeof otpSchema>;
type NewPasswordValues = z.infer<typeof newPasswordSchema>;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useDynamicMutation();
  const headers = getHeaders({ token: "token", type: "Json" });
  const [hasEmail, sethasEmail] = React.useState(false);
  const [tempEmail, setTempEmail] = React.useState<string>("");
  const [hasCode, sethasCode] = React.useState(false);
  const forgotInitialValues: ForgotPasswordValues = {
    email: "",
  };
  const otpInitialValues: OtpValues = {
    code: undefined,
  };
  const passwordInitialValues: NewPasswordValues = {
    password: "",
    confirmPassword: "",
  };

  //send  email Post request
  const sendOtpSubmitHandler = async (values: ForgotPasswordValues) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        url: `auth/forgot-password`,
        method: "POST",
        headers,
        body: {
          email: values.email,
        },
        onSuccess: () => {
          sethasEmail(true);
          toast({
            title: "otp sent to your email!.",
            description: "Please Check Ypur Email",
            variant: "success",
          });
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //verify otp post request
  const verifyOtpSubmitHandler = async (values: OtpValues) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        url: `auth/forgot-password/verify-otp`,
        method: "POST",
        headers,
        body: {
          code: values.code,
          email: tempEmail,
        },
        onSuccess: () => {
          sethasCode(true);
          toast({
            title: "Success!",
            description: "Successfully verified! ",
            variant: "success",
          });
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // set new password new request
  const setNewPasswordSubmitHandler = async (values: NewPasswordValues) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        url: `auth/forgot-password/set-new-password`,
        method: "PUT",
        headers,
        body: {
          password: values.password,
          email: tempEmail,
        },
        onSuccess: () => {
          navigate("/login");
          toast({
            title: "Success!",
            description: "Your Password Successfully Changed ",
            variant: "success",
          });
        },
        onError: (err) => {
          toast({
            title: "Error.",
            description: err?.response?.data?.message,
            variant: "danger",
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-dark-bg w-full">
      <div className="p-3 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto">
        {!hasEmail ? (
          <div className="flex flex-col items-center space-y-3 bg-white p-3 rounded-md shadow-lg">
            <h1 className="font-medium text-[#16213F] text-center">
              Enter your email and we'll send you instructions to reset your
              password.
            </h1>
            <Formik
              initialValues={forgotInitialValues}
              validationSchema={forgotValidation}
              onSubmit={(val) => {
                sendOtpSubmitHandler(val);
                setTempEmail(val.email);
              }}
            >
              {() => (
                <Form className="flex flex-col items-center space-y-2 w-full">
                  <Input
                    name="email"
                    label="email"
                    disabled={forgotPasswordMutation.isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={forgotPasswordMutation.isLoading}
                    fullWidth
                  >
                    {forgotPasswordMutation.isLoading ? (
                      <ButtonLoader />
                    ) : (
                      "Send"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
            <p
              onClick={() => navigate("/login")}
              className="text-main-color text-center text-sm cursor-pointer font-medium py-3"
            >
              Back to Login
            </p>
          </div>
        ) : !hasCode ? (
          <div className="flex flex-col items-center space-y-3">
            <h1 className="font-medium text-[#16213F] text-center">
              Enter the OTP code that we have sent to you.
            </h1>
            <Formik
              initialValues={otpInitialValues}
              validationSchema={otpValidation}
              onSubmit={verifyOtpSubmitHandler}
            >
              {({ setFieldValue }) => {
                return (
                  <Form className="flex flex-col items-center space-y-3">
                    <ReactCodeInput
                      inputMode="numeric"
                      name=""
                      type="tel"
                      fields={6}
                      // {...props}
                      onChange={(code) => setFieldValue("code", code)}
                      inputStyle={{
                        margin: "4px",
                        width: "40px",
                        borderRadius: "5px",
                        fontSize: "20px",
                        height: "40px",
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid #d1d5db",
                        textAlign: "center",
                      }}
                      disabled={forgotPasswordMutation.isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={forgotPasswordMutation.isLoading}
                      fullWidth
                    >
                      {forgotPasswordMutation.isLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 w-full">
            <h1 className="font-medium text-[#16213F] text-center">
              Enter Your New Password
            </h1>
            <Formik
              initialValues={passwordInitialValues}
              validationSchema={passwordValidation}
              onSubmit={setNewPasswordSubmitHandler}
            >
              {() => (
                <Form className="flex flex-col items-center space-y-1 w-full">
                  <PasswordInput
                    name="password"
                    label="password"
                    disabled={forgotPasswordMutation.isLoading}
                  />
                  <PasswordInput
                    name="confirmPassword"
                    label="confirm Password"
                    disabled={forgotPasswordMutation.isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={forgotPasswordMutation.isLoading}
                    fullWidth
                  >
                    {forgotPasswordMutation.isLoading ? (
                      <ButtonLoader />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
