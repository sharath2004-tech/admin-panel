import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import React, { useState } from "react";
import InHousePropertyTable from "./components/InHousePropertyTable";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const InHouseProperty: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const inHouseProperties = useFetchData(
    ["InHousePropertyDataApi", currentPage, perPage, stateChange],
    `property/in-house?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="InHouse Properties">
        <Button onClick={() => navigate("/properties/in-house/create")}>
          Add Property
        </Button>
      </HeaderContainer>
      <div className="w-full">
        {inHouseProperties.isFetched && inHouseProperties.isSuccess ? (
          <div className="w-full">
            <InHousePropertyTable
              data={inHouseProperties?.data?.pagination}
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
      {inHouseProperties.isFetched && inHouseProperties.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default InHouseProperty;
