import React from "react";
import Button from "@/lib/ui/Button";
import { getHeaders } from "@/config/apiConfig";
import Header from "@/lib/ui/Header";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import { ButtonLoader } from "@/constants/Loader";
import { useTheme } from "@/hooks/useThemeContext";
import { BsCheck } from "react-icons/bs";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const BulkCreate: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
  // id,
}) => {
  const { token } = useAuth();
  const headers = getHeaders({ token: token, type: "Json" });
  const [removedType, setRemovedType] = React.useState<string[]>([]);
  const createPropertyMutation = useDynamicMutation();
  const { currentTheme } = useTheme();
  //bulk create of property types arrays
  const propertyTypes = [
    "Villa",
    "Apartment",
    "Condo",
    "Townhouse",
    "Single-Family Home",
    "Duplex",
    "Penthouse",
    "Mobile Home",
    "Co-op (Cooperative Housing)",
    "Ranch House",
    "Bungalow",
    "Cottage",
    "Mansion",
    "Studio Apartment",
    "Loft",
    "Cabin",
  ];
  const handleSubmit = () => {
    if (
      propertyTypes.filter((item) => !removedType.includes(item)).length < 1
    ) {
      toast({
        title: "",
        description: "Please Add At least One Property Type",
        variant: "info",
      });
      return;
    }
    createPropertyTypeHandler();
  };
  const createPropertyTypeHandler = async () => {
    try {
      await createPropertyMutation.mutateAsync({
        url: `property-type/create/bulk`,
        method: "POST",
        headers,
        body: {
          data: propertyTypes.filter((item) => !removedType.includes(item)),
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setStateChange((prev) => !prev);
          toast({
            title: "Success!.",
            description: "Bulk Property Type Created Successfully",
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
    <div className="flex flex-col items-start space-y-2 w-full">
      <Header title="Create the Most Basic Property Types That are Listed Below!" />
      <p
        className={`${
          currentTheme === "dark" ? "text-white" : "text-slate-900"
        } font-normal text-center text-xs `}
      >
        If the Property Type is Already Created you can remove it by Clicking on
        it!
      </p>
      <div className="flex items-center flex-wrap gap-2">
        {propertyTypes?.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              if (removedType.includes(item)) {
                setRemovedType(removedType.filter((i) => i !== item));
              } else {
                setRemovedType([...removedType, item]);
              }
            }}
          >
            <BsCheck className="text-main-color" />
            <p
              className={`${
                currentTheme === "dark" ? "text-white" : "text-slate-900"
              } font-medium ${
                removedType.includes(item) ? "line-through" : ""
              } `}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
      <Button
        fullWidth
        type="submit"
        disabled={createPropertyMutation.isLoading}
        onClick={handleSubmit}
      >
        {createPropertyMutation.isLoading ? <ButtonLoader /> : "Bulk Create"}
      </Button>
    </div>
  );
};

export default BulkCreate;
