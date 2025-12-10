import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import * as z from "zod";
import { agentSchema } from "@/validation/agent";
import { ButtonLoader } from "@/constants/Loader";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
type agentValues = z.infer<typeof agentSchema>;
const CreateInHouseAgent: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
}) => {
  const { token } = useAuth();
  const createAgentMutation = useDynamicMutation();
  const headers = getHeaders({ token: token, type: "Json" });
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("first Name is required"),
    lastName: Yup.string().required("last Name is required"),
    email: Yup.string().email().required("email is required"),
    phone: Yup.string().required("phone is required"),
    password: Yup.string().min(6).required("password is required"),
    whatsappNumber: Yup.string(),
  });
  const initialValues: agentValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    whatsappNumber: "",
  };

  const createAgentSubmitHandler = async (values: agentValues) => {
    try {
      await createAgentMutation.mutateAsync({
        url: `agents/create/admin`,
        method: "POST",
        headers,
        body: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone.toString(),
          email: values.email,
          password: values.password,
          role: "Agent",
          whatsappNumber: values.whatsappNumber && values.whatsappNumber,
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Agent Created Successfully",
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
    <div>
      <Header title="Add New Agent" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createAgentSubmitHandler}
      >
        {() => (
          <Form className="flex flex-col items-start space-y-2 w-full">
            <Input
              name="firstName"
              label="first Name"
              disabled={createAgentMutation.isLoading}
            />
            <Input
              name="lastName"
              label="last Name"
              disabled={createAgentMutation.isLoading}
            />
            <Input
              name="email"
              label="email"
              disabled={createAgentMutation.isLoading}
            />
            <Input
              name="phone"
              label="phone Number"
              disabled={createAgentMutation.isLoading}
              type="number"
            />
            <Input
              name="whatsappNumber"
              label="whatsappNumber"
              disabled={createAgentMutation.isLoading}
            />
            <Input
              name="password"
              label="password"
              disabled={createAgentMutation.isLoading}
            />
            <div className="pt-3 w-full">
              <Button fullWidth type="submit">
                {createAgentMutation.isLoading ? <ButtonLoader /> : "Create"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateInHouseAgent;
