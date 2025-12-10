import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/lib/ui/Input";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import { PackageForm } from "@/types/Package";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Textarea from "@/lib/ui/Textarea";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePackageForm: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
}) => {
  const { token } = useAuth();
  const headers = getHeaders({ token: token, type: "Json" });
  const createPackageMutation = useDynamicMutation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
    maxListingsAllowed: Yup.number().integer().required(
      "max listing allowed is required"
    ),
    price: Yup.number().required("price is required"),
  });
  const initialValues: PackageForm = {
    name: "",
    description: "",
    maxListingsAllowed: undefined,
    price: undefined,
  };

  const createPackageMutationHandler = async (values: PackageForm) => {
    try {
      await createPackageMutation.mutateAsync({
        url: `packages/create`,
        method: "POST",
        headers,
        body: {
          name: values.name,
          description: values.description,
          maxListingsAllowed: values.maxListingsAllowed,
          remining: values.maxListingsAllowed,
          price: values.price,
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Package Created Successfully",
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
      <Header title="Add New Listing Package" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createPackageMutationHandler}
      >
        {() => {
          return (
            <Form className="flex flex-col items-start space-y-1 w-full">
              <Input
                name="name"
                label="Package Name"
                disabled={createPackageMutation.isLoading}
              />
              <Textarea
                name="description"
                label="description"
                disabled={createPackageMutation.isLoading}
              />
              <Input
                name="price"
                label="Price"
                disabled={createPackageMutation.isLoading}
                type="number"
              />
              <Input
                name="maxListingsAllowed"
                label="max Listings Allowed"
                type="number"
                disabled={createPackageMutation.isLoading}
              />

              <Button fullWidth type="submit">
                {createPackageMutation.isLoading ? "Loading" : "Create"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreatePackageForm;
