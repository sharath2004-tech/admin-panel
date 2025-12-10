import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/lib/ui/Input";
import ReusableDropzone from "@/lib/ui/DropZone";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import { IOwnerForm } from "@/types/Owner";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { ButtonLoader } from "@/constants/Loader";
import { toast } from "@/hooks/useToast";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}
const AddOwnerForm: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
  // id,
}) => {
  const { token } = useAuth();
  const headers = getHeaders({ token: token, type: "FormData" });
  const createOwnerMutation = useDynamicMutation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    phone: Yup.number().required("phone is required"),
    email: Yup.string(),
    address: Yup.string().required("address is required"),
    logo: Yup.mixed().required("logo is required"),
  });
  const initialValues: IOwnerForm = {
    name: "",
    phone: undefined,
    email: "",
    address: "",
    logo: undefined,
  };

  const createOwnerSubmitHandler = async (values: IOwnerForm) => {
    try {
      await createOwnerMutation.mutateAsync({
        url: `owner/create`,
        method: "POST",
        headers,
        body: {
          name: values.name,
          phone: Number(values.phone),
          email: values.email,
          address: values.address,
          logo: values.logo,
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Owner Created Successfully",
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
      <Header title="Add New Owner" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createOwnerSubmitHandler}
      >
        {() => (
          <Form className="flex flex-col items-start space-y-1 w-full">
            <Input
              name="name"
              label="Owner Name"
              disabled={createOwnerMutation.isLoading}
            />
            <Input
              name="phone"
              label="phone Number"
              disabled={createOwnerMutation.isLoading}
              type="number"
            />
            <Input
              name="email"
              label="email"
              disabled={createOwnerMutation.isLoading}
            />
            <Input
              name="address"
              label="address"
              disabled={createOwnerMutation.isLoading}
            />
            <ReusableDropzone maxFiles={1} name="logo" label="logo" />
            <div></div>
            <Button
              disabled={createOwnerMutation.isLoading}
              fullWidth
              type="submit"
            >
              {createOwnerMutation.isLoading ? <ButtonLoader /> : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOwnerForm;
