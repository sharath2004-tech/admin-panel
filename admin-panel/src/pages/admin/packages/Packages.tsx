import { getHeaders } from "@/config/apiConfig";
import { MainLoader } from "@/constants/Loader";
import HeaderContainer from "@/containers/HeaderContainer";
import CreatePackageForm from "@/forms/admin/packages/CreatePackageForm";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import Modal from "@/lib/ui/Modal";
import React, { useState } from "react";

import PackageCard from "./components/PackageCard";

interface Package {
  _id: string;
  name: string;
  description: string;
  maxListingsAllowed: number;
  price: number;
}
const Packages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const packagesData = useFetchData(
    ["packagesDataApi", stateChange],
    `packages/find/all`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Listing Packages">
        <Button onClick={() => setIsModalOpen(true)}>Create Package</Button>
      </HeaderContainer>
      <div className="w-full">
        {packagesData.isFetched && packagesData.isSuccess ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {packagesData?.data?.length > 0 ? (
              packagesData?.data?.map((item: Package) => (
                <PackageCard
                  item={item}
                  id={id}
                  setId={setId}
                  setStateChange={setStateChange}
                  setIsModalOpen={setIsModalOpen}
                />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 w-full">
                <p className="text-center text-sm dark:text-gray-400">
                  No Listing Packages Available
                </p>
              </div>
            )}
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setId(null);
        }}
      >
        <CreatePackageForm
          setIsModalOpen={setIsModalOpen}
          setStateChange={setStateChange}
        />
      </Modal>
    </div>
  );
};

export default Packages;
