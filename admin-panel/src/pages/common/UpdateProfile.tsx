import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useFetchData } from "@/hooks/useFetchData";
import { ButtonLoader, MainLoader } from "@/constants/Loader";
import Input from "@/lib/ui/Input";
import ReusableDropzone from "@/lib/ui/DropZone";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import Button from "@/lib/ui/Button";
import Header from "@/lib/ui/Header";

interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile_image: File | undefined;
}
interface Props {
  stateChange: boolean;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateProfile: React.FC<Props> = ({ setStateChange, stateChange }) => {
  const updateProfileMutation = useDynamicMutation();
  const { token, user, login } = useAuth();
  const headers = getHeaders({ type: "FormData", token });
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("first Name is required"),
    lastName: Yup.string().required("last Name is required"),
    email: Yup.string(),
    phone: Yup.string().required("phone  is required"),
    profile_image: Yup.mixed().optional(),
  });
  const profileData = useFetchData(
    ["profileDataApi", stateChange],
    `users/profile/${user?._id}`,
    headers
  );
  const initialValues: ProfileInfo = {
    firstName: profileData?.data?.firstName,
    lastName: profileData?.data?.lastName,
    email: profileData?.data?.email ?? "",
    phone: profileData?.data?.phone,
    profile_image: undefined,
  };

  //UPDATE PROFILE
  const updateProfileInfoHandler = async (values: ProfileInfo) => {
    try {
      await updateProfileMutation.mutateAsync({
        url: `users/profile/update/${user?._id}`,
        method: "PUT",
        headers,
        body: {
          firstName: values.firstName,
          latName: values.lastName,
          phone: values.phone,
          image: values.profile_image && values.profile_image,
        },
        onSuccess: (res) => {
          login(token!, {
            broker: res?.broker,
            _id: res?._id,
            firstName: res?.firstName,
            lastName: res?.lastName,
            profile_image: res?.profile_image,
            phone: res?.phone,
            email: res?.email,
            role: res?.role,
            permissions: res?.permissions,
            updatedAt: res?.updatedAt,
          });
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Profile Updated Successfully",
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
      {profileData.isFetched && profileData.isSuccess ? (
        <div className="w-full">
          <Header title="Update Profile" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateProfileInfoHandler}
          >
            {({ values }) => (
              <Form className="w-full flex flex-col items-center gap-3">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input name="firstName" label=" first Name" />
                  <Input name="lastName" label=" last Name" />
                </div>
                <Input name="email" label="email" disabled />
                <Input name="phone" label="phone" type="number" />

                <div className="w-full">
                  <ReusableDropzone
                    name="profile_image"
                    label="profile image"
                  />
                  {!values.profile_image && (
                    <img
                      src={profileData?.data?.profile_image}
                      alt="Profile image"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="md:col-span-2 lex items-end justify-end self-end gap-3 pt-5">
                  <Button type={"submit"}>
                    {updateProfileMutation.isLoading ? (
                      <ButtonLoader />
                    ) : (
                      "Update Information"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <MainLoader />
      )}
    </div>
  );
};

export default UpdateProfile;
