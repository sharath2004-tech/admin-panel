import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/lib/ui/Input";
import ReusableDropzone from "@/lib/ui/DropZone";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { ButtonLoader } from "@/constants/Loader";
import { toast } from "@/hooks/useToast";
import * as z from "zod";
import { sendNotificationSchema } from "@/validation/notification";
import Textarea from "@/lib/ui/Textarea";
import { useNavigate } from "react-router-dom";

type NotificationValues = z.infer<typeof sendNotificationSchema>;
interface Props {}
const SendNotificationForm: React.FC<Props> = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const headers = getHeaders({ token: token, type: "Json" });
  const createOwnerMutation = useDynamicMutation();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Notification Title is required"),
    desciption: Yup.string().required("Notification desciption is required"),

    image: Yup.mixed(),
  });
  const initialValues: NotificationValues = {
    title: "",
    desciption: "",
    image: undefined,
  };

  const createOwnerSubmitHandler = async (values: NotificationValues) => {
    try {
      await createOwnerMutation.mutateAsync({
        url: `notification/push/all-users`,
        method: "POST",
        headers,
        body: {
          title: values.title,
          image: values.image && values.image,
          desciption: values.desciption,
        },
        onSuccess: () => {
          navigate(-1);
          toast({
            title: "Success!.",
            description: "Notification Sent Successfully",
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
    <div className="max-w-4xl mx-auto p-3 bg-white dark:bg-secondary-dark-bg rounded-md">
      <Header title="Send Notification" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createOwnerSubmitHandler}
      >
        {() => (
          <Form className="flex flex-col items-start space-y-1 w-full">
            <Input
              name="title"
              label="Notification Name"
              disabled={createOwnerMutation.isLoading}
            />
            <Textarea name="desciption" label="desciption" />

            <ReusableDropzone maxFiles={1} name="image" label="image" />
            <div></div>
            <Button
              disabled={createOwnerMutation.isLoading}
              fullWidth
              type="submit"
            >
              {createOwnerMutation.isLoading ? <ButtonLoader /> : "Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendNotificationForm;
