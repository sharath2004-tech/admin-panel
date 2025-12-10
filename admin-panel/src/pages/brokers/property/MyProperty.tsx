import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import BrokersPropertyTable from "./components/BrokersPropertyTable";
import { useNavigate } from "react-router-dom";
import Button from "@/lib/ui/Button";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
const MyProperty: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const BrokersPropertyData = useFetchData(
    ["BrokersPropertyDataApi", currentPage, perPage, stateChange],
    `property/broker/my-property/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 bg-white dark:bg-secondary-dark-bg my-transition flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="Properties">
        <Button onClick={() => navigate("/properties/create/new")}>
          Add Property
        </Button>
      </HeaderContainer>
      <div className="w-full">
        {BrokersPropertyData.isFetched && BrokersPropertyData.isSuccess ? (
          <div className="w-full">
            <BrokersPropertyTable
              data={BrokersPropertyData?.data?.pagination}
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
      {BrokersPropertyData.isFetched && BrokersPropertyData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default MyProperty;
