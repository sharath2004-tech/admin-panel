import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import CreateInHouseAgent from "@/forms/admin/agents/CreateInHouseAgent";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import Modal from "@/lib/ui/Modal";
import React, { useState } from "react";
import InHouseAgentsTable from "./components/InHouseAgentsTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
const InHouseAgents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const inHouseAgents = useFetchData(
    ["adBannerDataApi", currentPage, perPage, stateChange],
    `agents/admin/in-house-agents?page=${currentPage}&perPage=${perPage}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="InHouse Agents">
        <Button onClick={() => setIsModalOpen(true)}>Create Agent</Button>
      </HeaderContainer>
      <div className="w-full">
        {inHouseAgents.isFetched && inHouseAgents.isSuccess ? (
          <div className="w-full">
            <InHouseAgentsTable
              data={inHouseAgents?.data?.pagination}
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
      {inHouseAgents.isFetched && inHouseAgents.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <CreateInHouseAgent
          setIsModalOpen={setIsModalOpen}
          setStateChange={setStateChange}
        />
      </Modal>
    </div>
  );
};

export default InHouseAgents;
