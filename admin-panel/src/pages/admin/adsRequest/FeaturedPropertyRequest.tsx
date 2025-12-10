import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import React, { useState } from "react";
import FeaturedPropertyRequestTable from "./components/FeaturedPropertyRequestTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const FeaturedPropertyRequest: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const featuredPropertiesData = useFetchData(
    ["featuredPropertiesDataApi", currentPage, perPage, stateChange],
    `featured-property/admin/all?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Featured Property Requests"></HeaderContainer>
      <div className="w-full">
        {featuredPropertiesData.isFetched &&
        featuredPropertiesData.isSuccess ? (
          <div className="w-full">
            <FeaturedPropertyRequestTable
              data={featuredPropertiesData?.data?.pagination}
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
      {featuredPropertiesData.isFetched && featuredPropertiesData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
    </div>
  );
};

export default FeaturedPropertyRequest;
