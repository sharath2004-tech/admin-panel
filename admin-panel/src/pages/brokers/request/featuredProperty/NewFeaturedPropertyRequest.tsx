import { getHeaders } from "@/config/apiConfig";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { Property } from "@/types/Property";
import { useState } from "react";
import ForFeaturePropertyTable from "./components/ForFeaturePropertyTable";
// import FeaturePropertyStepper from "@/components/FeaturePropertyStepper";
import Button from "@/lib/ui/Button";
import FinishPayment from "./components/FinishPayment";
import { MainLoader } from "@/constants/Loader";

const NewFeaturedPropertyRequest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [selectedProperties, setSelectedProperties] = useState<Property | null>(
    null
  );
  const [activeStep, setActiveStep] = useState<number>(1);
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const forFeaturePropertyData = useFetchData(
    ["BrokersForFeaturedPropertyDataApi", currentPage, perPage, stateChange],
    `property/broker/my-property/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );

  return (
    <div className="bg-white dark:bg-secondary-dark-bg p-3 rounded-md my-transition">
      {/* <FeaturePropertyStepper activeStep={activeStep} /> */}
      {activeStep == 1 ? (
        <div className="w-full">
          <h1 className="font-medium pb-2 dark:text-white">Select Property</h1>
          {forFeaturePropertyData.isFetched &&
          forFeaturePropertyData.isSuccess ? (
            <div className="w-full">
              <ForFeaturePropertyTable
                data={forFeaturePropertyData?.data?.pagination}
                setCurrentPage={setCurrentPage}
                setPerPage={setPerPage}
                currentPage={currentPage}
                perPage={perPage}
                setStateChange={setStateChange}
                setSelectedProperties={setSelectedProperties}
                selectedProperties={selectedProperties}
              />
            </div>
          ) : (
            <MainLoader />
          )}
        </div>
      ) : (
        <FinishPayment selectedProperties={selectedProperties} />
      )}
      <div className="flex items-center justify-end self-end gap-3">
        {activeStep === 1 && (
          <Button
            disabled={!selectedProperties}
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            Next
          </Button>
        )}
        {activeStep > 1 && (
          <Button onClick={() => setActiveStep((prev) => prev - 1)}>
            back
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewFeaturedPropertyRequest;
