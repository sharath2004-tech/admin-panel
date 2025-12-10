import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Modal from "@/lib/ui/Modal";
import React, { useState } from "react";
import Payment from "./components/Payment";
import { Package } from "@/types/Package";
import ErrorBoundary from "@/components/ErrorBoundary";
import { BsCheck } from "react-icons/bs";
import { MainLoader } from "@/constants/Loader";

const Package: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { token, user } = useAuth();
  console.log({ user });
  const headers = getHeaders({ type: "Json", token });
  const packagesData = useFetchData(
    ["BrockersPackagesDataApi", stateChange],
    `packages/find/all`,
    headers
  );
  console.log(packagesData?.data);
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="Listing Packages"></HeaderContainer>
      <div className="w-full ">
        {packagesData.isFetched && packagesData.isSuccess ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
            {packagesData?.data?.length > 0 ? (
              packagesData?.data?.map((item: Package) => (
                <div className="relative flex flex-col items-center space-y-3 px-5 pt-10 pb-5  bg-white dark:bg-secondary-dark-bg rounded-md shadow-lg my-transition">
                  <h2 className="font-bold text-lg capitalize dark:text-white">
                    {item.name}
                  </h2>
                  <h3 className="font-bold text-lg capitalize dark:text-gray-300">
                    ${item.price}
                  </h3>
                  <p className="text-center dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="pb-20 flex items-center gap-1 justify-between w-full border-y border-gray-200 py-2 dark:border-[#1c2f50]">
                    <div className="flex items-center">
                      <BsCheck className="dark:text-white" />

                      <h3 className="dark:text-white">Listing Properties</h3>
                    </div>
                    <h3 className="dark:text-white">
                      {item.maxListingsAllowed}
                    </h3>
                  </div>

                  <div className="absolute bottom-2 p-2  w-full">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedPackage(item);
                      }}
                      className="  text-center w-full bg-blue-bg rounded-full py-2 text-white font-medium hover:bg-blue-bg/50 transition-all duration-300 ease-in-out"
                      // className="w-full text-center border-2 bg-blue-bg "
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-2xl dark:text-white">No Packages Found</h1>
              </div>
            )}
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      {packagesData.isFetched && packagesData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPackage(null);
        }}
      >
        <Payment
          selectedPackage={selectedPackage}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default Package;
