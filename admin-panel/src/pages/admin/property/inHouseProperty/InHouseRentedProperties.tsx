import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import InHousePropertyTable from "./components/InHousePropertyTable";
const InHouseRentedProperties: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const inHouseRentedProperties = useFetchData(
    ["InHousePropertyDataApi", currentPage, perPage, stateChange],
    `property/in-house/rented?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full">
      <HeaderContainer headerTitle="Rented Properties">
      </HeaderContainer>
      <div className="w-full">
        {inHouseRentedProperties.isFetched &&
        inHouseRentedProperties.isSuccess ? (
          <div className="w-full">
            <InHousePropertyTable
              data={inHouseRentedProperties?.data?.pagination}
              setCurrentPage={setCurrentPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
              perPage={perPage}
              setStateChange={setStateChange}
            />
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default InHouseRentedProperties;
