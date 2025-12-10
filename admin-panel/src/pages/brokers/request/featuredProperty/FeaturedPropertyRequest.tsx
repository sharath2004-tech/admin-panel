import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";
import FeaturedPropertiesTable from "./components/FeaturedPropertiesTable";
const FeaturedPropertyRequest: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const featuredPropertiesData = useFetchData(
    ["featuredPropertiesDataApi", currentPage, perPage, stateChange],
    `featured-property/broker/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Property Ads">
        <Button onClick={() => navigate("/requests/new-request")}>
          New Property Ad
        </Button>
      </HeaderContainer>
      <div className="w-full">
        {featuredPropertiesData.isFetched &&
        featuredPropertiesData.isSuccess ? (
          <div className="w-full">
            <FeaturedPropertiesTable
              data={featuredPropertiesData?.data?.pagination}
              setCurrentPage={setCurrentPage}
              setPerPage={setPerPage}
              currentPage={currentPage}
              perPage={perPage}
            />
          </div>
        ) : (
          <MainLoader />
        )}
        {featuredPropertiesData.isFetched && featuredPropertiesData.isError && (
          <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
        )}
      </div>
    </div>
  );
};

export default FeaturedPropertyRequest;
