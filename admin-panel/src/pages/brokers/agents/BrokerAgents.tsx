import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import Modal from "@/lib/ui/Modal";
import React, { useState } from "react";
import BrokerAgentsTable from "./components/BrokerAgentsTable";
import CreateBrokerAgentForm from "@/forms/broker/agents/CreateBrokerAgentForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const BrokerAgents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token, user } = useAuth();
  console.log(user);
  const headers = getHeaders({ type: "Json", token });
  const brokerAgents = useFetchData(
    ["adBannerDataApi", currentPage, perPage, stateChange],
    `agents/broker/agents/${user?.broker}?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Company Agents">
        <Button onClick={() => setIsModalOpen(true)}>Create Agent</Button>
      </HeaderContainer>
      <div className="w-full">
        {brokerAgents.isFetched && brokerAgents.isSuccess ? (
          <div className="w-full">
            <BrokerAgentsTable
              data={brokerAgents?.data?.pagination}
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
      {brokerAgents.isFetched && brokerAgents.isError && (
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

export default BrokerAgents;
