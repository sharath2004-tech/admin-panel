/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ILogin } from "@/types/Auth";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import { ButtonLoader } from "@/constants/Loader";
import { useAuth } from "@/hooks/useAuthContext";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import useDynamicMutation from "@/hooks/usePostData";
import Logo from "@/assets/logo.png";
const Login = () => {
  const loginMutation = useDynamicMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  //
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("email is required"),
    password: Yup.string().min(6).required("password is required"),
  });

  const loginMutationSubmitHandler = async (values: ILogin) => {
    try {
      await loginMutation.mutateAsync({
        url: `auth/dashboard/login`,
        method: "POST",
        headers,
        body: {
          email: values.email,
          password: values.password,
        },
        onSuccess: (responseData) => {
          login(responseData?.token, {
            broker: responseData?.user?.broker,
            _id: responseData?.user?._id,
            firstName: responseData?.user?.firstName,
            lastName: responseData?.user?.lastName,
            profile_image: responseData?.user?.profile_image,
            phone: responseData?.user?.phone,
            email: responseData?.user?.email,
            role: responseData?.user?.role,
            permissions: responseData?.user?.permissions,
            updatedAt: responseData?.user?.updatedAt,
          });
          toast({
            title: "Login Success!.",
            description: "Redirecting...",
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
      <div className="p-3 flex flex-col items-center justify-center min-h-screen w-full max-w-sm mx-auto">
        <div className="text-center flex flex-col  items-center justify-center">
          <img src={Logo} alt="logo" className="h-20 object-contain" />
        </div>
        <Formik
          initialValues={{ email: "", password: "password" }}
          validationSchema={validationSchema}
          onSubmit={loginMutationSubmitHandler}
        >
          {() => (
            <Form className="pt-5 flex flex-col items-start space-y-2 max-w-xl mx-auto w-full">
              <div className="flex flex-col items-start space-y-1 w-full">
                <Input
                  label="email"
                  type="email"
                  name="email"
                  disabled={loginMutation.isLoading}
                />
              </div>
              <div className="flex flex-col items-start space-y-1 w-full">
                <Input
                  name="password"
                  type="password"
                  label="password"
                  disabled={loginMutation.isLoading}
                />
              </div>

              <Button
                fullWidth={true}
                type="submit"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading ? <ButtonLoader /> : "Log in"}
              </Button>
            </Form>
          )}
        </Formik>
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-main-color text-center text-sm cursor-pointer font-medium py-3"
        >
          Forgot Password
        </p>
      </div>
    </div>
  );
};

export default Login;
