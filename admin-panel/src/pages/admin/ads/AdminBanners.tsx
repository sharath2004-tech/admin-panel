
import { getHeaders } from "@/config/apiConfig";
import HeaderContainer from "@/containers/HeaderContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/ui/Option";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import Button from "@/lib/ui/Button";
import Modal from "@/lib/ui/Modal";
import  { useState } from "react";
import BannerAdsTable from "./components/BannerAdsTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MainLoader } from "@/constants/Loader";
import AddBannerForm from "@/forms/admin/ads/AddBannerForm";
import { AdsFilterType } from "@/utils/filter.enum";
import { useTheme } from "@/hooks/useThemeContext";
import { systemTheme } from "@/constants/Color";
const AdminBannerAds = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterType, setFilterType] = useState<AdsFilterType>(
    AdsFilterType.All
  ); // ["All", "Brokers", "InHouses"
  const { currentTheme } = useTheme();
  const [perPage, setPerPage] = useState<number>(10);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const { token } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const bannerAdsData = useFetchData(
    ["adBannerDataApi", currentPage, perPage, stateChange, filterType],
    `ads/admin/get-all-ads?page=${currentPage}&perPage=${perPage}&type=${filterType}`,
    headers
  );
  return (
    <div className="p-3 flex flex-col items-start space-y-3 w-full bg-white dark:bg-secondary-dark-bg my-transition">
      <HeaderContainer headerTitle="Banner Ads">
        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center">
          <Select onValueChange={(e: AdsFilterType) => setFilterType(e)}>
            <SelectTrigger className="w-[130px] bg-gray-300 p-[8px] md:p-[10px] border border-gray-300 dark:border-gray-700 dark:bg-main-dark-bg my-transition dark:text-white">
              <SelectValue placeholder={AdsFilterType.All} />
            </SelectTrigger>
            <SelectContent
              className={`${
                currentTheme === "dark" ||
                (currentTheme === "dark" && systemTheme)
                  ? "text-white bg-main-dark-bg border-gray-700"
                  : "bg-white"
              }`}
            >
              <SelectItem value={AdsFilterType.All}>All</SelectItem>
              <SelectItem value={AdsFilterType.Brokers}>Brokers</SelectItem>
              <SelectItem value={AdsFilterType.InHouses}>Inhouses</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsModalOpen(true)}>Add Banner Ad</Button>
        </div>
      </HeaderContainer>
      <div className="w-full">
        {bannerAdsData.isFetched && bannerAdsData.isSuccess ? (
          <div className="w-full">
            <BannerAdsTable
              data={bannerAdsData?.data?.pagination}
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
      {bannerAdsData.isFetched && bannerAdsData.isError && (
        <ErrorBoundary onClick={() => setStateChange((prev) => !prev)} />
      )}
      <Modal
        maxWidth="sm"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddBannerForm
          setIsModalOpen={setIsModalOpen}
          setStateChange={setStateChange}
        />
      </Modal>
    </div>
  );
};

export default AdminBannerAds;


