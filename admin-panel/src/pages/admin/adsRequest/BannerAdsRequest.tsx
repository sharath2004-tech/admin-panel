import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Modal from "@/lib/ui/Modal";
import React, { useState } from "react";
import CreateBrokerAgentForm from "@/forms/broker/agents/CreateBrokerAgentForm";
import BannerAdsTable from "./components/BannerAdsTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const BannerAdsRequest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(2);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const bannerData = useFetchData(
    ["adsBannerDataApi", currentPage, perPage, stateChange],
    `ads/admin/get-all-broker-ads?page=${currentPage}&perPage=${perPage}&type=Brokers`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Banner Ads Request"></HeaderContainer>
      <div className="w-full">
        {bannerData.isFetched && bannerData.isSuccess ? (
          <div className="w-full">
            <BannerAdsTable
              data={bannerData?.data?.pagination}
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
      {bannerData.isFetched && bannerData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreateBrokerAgentForm
          setIsModalOpen={setIsModalOpen}
          setStateChange={setStateChange}
        />
      </Modal>
    </div>
  );
};

export default BannerAdsRequest;
