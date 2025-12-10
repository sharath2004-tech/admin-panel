import { getHeaders } from "@/config/apiConfig";
import { MainLoader } from "@/constants/Loader";
import { useAuth } from "@/hooks/useAuthContext";
import { useFetchData } from "@/hooks/useFetchData";
import ChangePassword from "@/pages/common/ChangePassword";
import UpdateProfile from "@/pages/common/UpdateProfile";
import { useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import UpdateCompanyInfo from "./UpdateCompanyInfo";

enum TabsdData {
  Profil = "Profile",
  Security = "Security",
  Company = "Company",
}
const Profile = () => {
  const { token, user } = useAuth();
  const headers = getHeaders({ type: "Json", token });
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [ActiveTab, setActiveTab] = useState<TabsdData>(TabsdData.Profil);
  const Tabs = ["Profile", "Security", "Company"];
  const profileData = useFetchData(
    ["profileDataApi"],
    `users/profile/${user?._id}`,
    headers
  );

  return (
    <div className="flex flex-col items-start space-y-5 w-full">
      {profileData.isFetched && profileData.isSuccess ? (
        <div className="pb-10  w-full relative bg-white  dark:bg-secondary-dark-bg rounded-lg  border border-gray-200 dark:border-gray-500 overflow-hidden">
          {/* <div className="absolute inset-0 z-30 bg-black/40" /> */}
          <div className="relative h-44 md:h-64 w-full">
            <div className="h-full w-full bg-blue-bg"></div>
          </div>
          <div className="absolute bottom-2  left-5 p-1 bg-white dark:bg-secondary-dark-bg/80 my-transition shadow-sm rounded-md flex w-fit">
            <img
              src={profileData?.data?.profile_image}
              alt="company logo"
              className=" h-20 md:h-28 rounded-md  object-contain "
            />
          </div>
          <div className="absolute bottom-0 py-10 left-36 flex flex-col items-start space-y-2">
            <h4 className="font-medium dark:text-gray-300 capitalize">
              {profileData?.data?.firstName + " " + profileData?.data?.lastName}
            </h4>
            <div className="flex items-center gap-2">
              <BsTelephoneFill className="text-main-green-color" />
              <h2 className="font-medium text-sm dark:text-gray-500">
                {profileData?.data?.phone}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-main-green-color" />
              <h2 className="font-medium text-sm dark:text-gray-500">
                {profileData?.data?.email}
              </h2>
            </div>
          </div>
          <div className="flex items-end justify-end absolute bottom-1 right-2 gap-3">
            {Tabs.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab as TabsdData)}
                key={index}
                className={`${
                  ActiveTab === tab
                    ? "text-main-color"
                    : "text-gray-700 dark:text-gray-300"
                } text-sm   items-center p-2  font-medium rounded-md inline-flex space-x-2`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
      {ActiveTab === TabsdData.Profil && (
        <UpdateProfile
          setStateChange={setStateChange}
          stateChange={stateChange}
        />
      )}
      {ActiveTab === TabsdData.Security && <ChangePassword />}
      {ActiveTab === TabsdData.Company && <UpdateCompanyInfo />}
    </div>
  );
};

export default Profile;
