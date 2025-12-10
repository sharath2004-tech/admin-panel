import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import Modal from "@/lib/ui/Modal";
import { useState } from "react";
import PropertyTypeTable from "./components/PropertyTypeTable";
import CreatePropertyTypeForm from "@/forms/admin/amenity/CreatePropertyTypeForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
import BulkCreate from "@/forms/admin/amenity/BulkCreate";

const PropertyType = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBulkUploading, setIsBulkUploading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const propertyTypeData = useFetchData(
    ["propertyTypeDataApi", currentPage, perPage, stateChange],
    `property-type/all?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 bg-white dark:bg-secondary-dark-bg rounded-md my-transition">
      <HeaderContainer headerTitle="Property Types">
        <Button onClick={() => setIsModalOpen(true)}>Add Property Type</Button>
      </HeaderContainer>
      <div className="w-full pt-3">
        {propertyTypeData.isFetched && propertyTypeData.isSuccess ? (
          <div className="w-full">
            <PropertyTypeTable
              data={propertyTypeData?.data?.pagination}
              setCurrentPage={setCurrentPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
              perPage={perPage}
              setStateChange={setStateChange}
            />
          </div>
        ) : (
          <MainLoader />
        )}
      </div>
      {propertyTypeData.isFetched && propertyTypeData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsBulkUploading(false);
        }}
      >
        <div className="flex items-end justify-end self-end">
          <button
            className="font-medium text-sm bg-blue-bg bg-opacity-50 hover:bg-opacity-90 text-white rounded-md p-2"
            onClick={() => setIsBulkUploading((prev) => !prev)}
          >
            {isBulkUploading ? "Input Mode" : "Bulk Create"}
          </button>
        </div>
        {isBulkUploading ? (
          <BulkCreate
            setIsModalOpen={setIsModalOpen}
            setStateChange={setStateChange}
          />
        ) : (
          <CreatePropertyTypeForm
            setIsModalOpen={setIsModalOpen}
            setStateChange={setStateChange}
          />
        )}
      </Modal>
    </div>
  );
};

export default PropertyType;
