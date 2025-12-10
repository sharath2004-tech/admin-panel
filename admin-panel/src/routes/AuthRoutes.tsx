import { Suspense } from "react";
import { useHome } from "@/hooks/useHomeContext";
import { AdminRoutes } from "./AdminRoutes";
import { useAuth } from "@/hooks/useAuthContext";
import { Role } from "@/types/Auth";
import { BrokerRoutes } from "./BrokerRoutes";
import "@/styles/DropDown.css";
import { MainLoader } from "@/constants/Loader";
import { Navbar, Sidebar } from "@/components/shared";
import Logo from "@/assets/logo.png";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
const AuthRoutes = () => {
  const { user } = useAuth();
  const {
    isSideBarOpen,
    screenSize,
    isOpen,
    isSmallScreen,
    activeMenu,
    setActiveMenu,
  } = useHome();
  const handleCloseSideBar = () => {
    if (activeMenu == true && screenSize && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const routes = user?.role === Role.Admin ? <AdminRoutes /> : <BrokerRoutes />;

  return (
    <>
      <div className="flex relative min-h-screen w-full bg-main-bg dark:bg-main-dark-bg transition-all duration-500 ease-in-out overflow-x-hidden">
        {!isSmallScreen ? (
          <div
            className={`h-screen bg-main-dark-bg duration-500 ${
              isOpen ? "w-0 hidden" : isSideBarOpen ? "w-64" : "w-20"
            } fixed dark:border-r dark:border-gray-700 border-dashed`}
          >
            <div className="sticky flex items-center justify-center space-x-2 p-4 border-b border-gray-700 border-dashed ">
              <img src={Logo} alt="App Logo" className="h-14 object-contain" />
              {isSideBarOpen && (
                <h1 className=" text-white  font-bold text-xl duration-500">
                  Sharath
                </h1>
              )}
            </div>
            {!isSmallScreen && (
              <SimpleBarReact className="h-screen   w-full  pb-24 ">
                <Sidebar />
              </SimpleBarReact>
            )}
          </div>
        ) : (
          <div className=" z-50">
            {activeMenu && (
              <div
                onClick={handleCloseSideBar}
                className="absolute inset-0 bg-main-dark-bg/30 backdrop-blur-sm"
              />
            )}
            <div
              className={`overflow-y-scroll scrollbar-hide   ${
                activeMenu
                  ? "transition ease-out duration-1000  max-w-[260px] z-50"
                  : "transition ease-out max-w-0"
              } w-full  h-screen bg-main-dark-bg fixed`}
            >
              <div className="sticky flex items-center justify-center space-x-2 p-4 border-b border-gray-700 border-dashed ">
                <img
                  src={Logo}
                  alt="App Logo"
                  className="h-14 object-contain"
                />
                {isSideBarOpen && (
                  <h1 className=" text-white  font-bold text-xl duration-500">
                    Sharath
                  </h1>
                )}
              </div>
              <Sidebar />
            </div>
          </div>
        )}
        <div
          className={` duration-500 overflow-x-hidden ${
            !isSmallScreen &&
            (isOpen ? "ml-0" : isSideBarOpen ? "ml-64" : " ml-20")
          }  w-full  `}
        >
          <Navbar />
          <div className="w-full p-2 md:p-3 overflow-x-hidden">
            <Suspense fallback={<MainLoader />}>{routes}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRoutes;
