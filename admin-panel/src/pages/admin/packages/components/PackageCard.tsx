import { getHeaders } from "@/config/apiConfig";
import ConfirmDialogBox from "@/containers/ConfirmDialogBox";
import { useAuth } from "@/hooks/useAuthContext";
import useDynamicMutation from "@/hooks/usePostData";
import { toast } from "@/hooks/useToast";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
interface Package {
    _id:string;
  name: string;
  description: string;
  maxListingsAllowed: number;
  price: number;
}
interface Props {
  item: Package;
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PackageCard: React.FC<Props> = ({ item, id, setId, setStateChange, setIsModalOpen }) => {
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    React.useState<boolean>(false);
  const postMutation = useDynamicMutation();

  const deletePackageStatusHandler = async () => {
    try {
      await postMutation.mutateAsync({
        url: `report/hide-property/${id}`,
        method: "PUT",
        headers,
        body: {},
        onSuccess: () => {
          toast({
            title: "Success!.",
            description: "Package removed Successfully",
            variant: "success",
          });
          setIsConfirmModalOpen(false);
          setStateChange((prev) => !prev);
          setId(null);
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
    <>
      <div key={item._id} className="flex flex-col items-center space-y-3 px-5 pt-10 pb-5 w-full bg-white dark:bg-main-dark-bg rounded-md shadow-lg my-transition">
        <div className="flex items-center justify-end self-end w-full gap-3">
          <div
            onClick={() => setIsConfirmModalOpen(true)}
            className="bg-red-500/40 p-1 rounded-full cursor-pointer hover:opacity-60"
          >
            <MdDelete className="text-red-500  text-xl" />
          </div>
          <div 
           onClick={() =>{ setIsModalOpen(true);setId(item._id)}}
          className="bg-amber-500/40 p-1 rounded-full cursor-pointer hover:opacity-60">
            <MdEdit className="text-amber-500  text-xl" />
          </div>
        </div>
        <h2 className="font-bold text-lg capitalize dark:text-white">
          {item.name}
        </h2>
        <h3 className="font-bold text-lg capitalize text-main-color">
          ${item.price}
        </h3>
        <p className="text-center dark:text-gray-300 capitalize ">
          {item.description}
        </p>
        <div className="flex items-center gap-1 justify-between w-full border-y border-gray-200 py-2 dark:border-[#1c2f50]">
          <div className="flex items-center">
            <BsCheck className="dark:text-white" />

            <h3 className="dark:text-white">Listing Properties</h3>
          </div>
          <h3 className="dark:text-white">{item.maxListingsAllowed}</h3>
        </div>
      </div>
      <ConfirmDialogBox
        title={" Are you Delete This Package?"}
        description={` please write reason why you Hide this property and things to be corrected, this will send as notification to the broker. `}
        onClick={deletePackageStatusHandler}
        isLoading={postMutation.isLoading}
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={setIsConfirmModalOpen}
      ></ConfirmDialogBox>
    </>
  );
};

export default PackageCard;
