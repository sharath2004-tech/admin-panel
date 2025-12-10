/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Button from "@/lib/ui/Button";
import { ButtonLoader } from "@/constants/Loader";
import PasswordInput from "@/lib/ui/PasswordInput";
import Header from "@/lib/ui/Header";

interface ProfileInfo {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}
const ChangePassword = () => {
  const updatePasswordMutation = useDynamicMutation();
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("old password is required"),
    new_password: Yup.string().required("new password is required"),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues: ProfileInfo = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  //UPDATE Password INFO REQUEST
  const updatePasswordInfoHandler = async (
    values: ProfileInfo,
    formikBag: any
  ) => {
    try {
      await updatePasswordMutation.mutateAsync({
        url: `auth/change-password/${user?._id}`,
        method: "PUT",
        headers,
        body: {
          oldPassword: values.current_password,
          newPassword: values.new_password,
        },
        onSuccess: () => {
          formikBag.resetForm();
          toast({
            title: "Success!.",
            description: "Password Changed Successfully",
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
    <div className="max-w-2xl mx-auto p-3 flex flex-col items-start space-y-4 w-full">
      <Header title="Change Password" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={updatePasswordInfoHandler}
      >
        {() => (
          <Form className="w-full flex flex-col items-center gap-3">
            <PasswordInput name="current_password" label=" current password" />
            <PasswordInput name="new_password" label="new password" />
            <PasswordInput
              name="confirm_new_password"
              label="confirm password"
            />

            <Button fullWidth type={"submit"}>
              {updatePasswordMutation.isLoading ? (
                <ButtonLoader />
              ) : (
                "Update Password"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
