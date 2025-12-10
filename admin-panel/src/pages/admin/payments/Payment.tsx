import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import PaymentTable from "./components/PaymentTable";
import { MainLoader } from "@/constants/Loader";
import ErrorBoundary from "@/components/ErrorBoundary";

const Payment = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const paymentData = useFetchData(
    ["paymentDataApi", currentPage, perPage, stateChange],
    `payment/admin/all?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Payments"></HeaderContainer>
      <div className="w-full">
        {paymentData.isFetched && paymentData.isSuccess ? (
          <div className="w-full">
            <PaymentTable
              data={paymentData?.data?.pagination}
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
      {paymentData.isFetched && paymentData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
  
    </div>
  );
};

export default Payment;
