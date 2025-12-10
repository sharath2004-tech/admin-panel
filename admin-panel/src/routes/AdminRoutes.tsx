import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "@/pages/common/NotFound";
import AdminBannerAds from "@/pages/admin/ads/AdminBanners";
const InHouseAgents = React.lazy(
  () => import("@/pages/admin/agents/inHouseAgents/InHouseAgents")
);

const Profile = React.lazy(() => import("@/pages/admin/profile/Profile"));
const Dashboard = React.lazy(() => import("@/pages/admin/dashboard/Dashboard"));
const GeneralSetting = React.lazy(
  () => import("@/pages/admin/settings/GeneralSetting")
);
const Users = React.lazy(() => import("@/pages/admin/users/Users"));
const Owners = React.lazy(() => import("@/pages/admin/owner/Owner"));
const Brokers = React.lazy(() => import("@/pages/admin/brokers/Brokers"));
const BrokerDetail = React.lazy(
  () => import("@/pages/admin/brokers/BrokerDetail")
);

const PackageRequests = React.lazy(
  () => import("@/pages/admin/packages/PackageRequests")
);
const PackageRequestDetail = React.lazy(
  () => import("@/pages/admin/packages/PackageRequestDetail")
);

const Packages = React.lazy(() => import("@/pages/admin/packages/Packages"));
const Payments = React.lazy(() => import("@/pages/admin/payments/Payment"));
const BrokerRequests = React.lazy(
  () => import("@/pages/admin/brokersRequests/BrokerRequests")
);
const BrokerRequestDetail = React.lazy(
  () => import("@/pages/admin/brokersRequests/BrokerRequestDetail")
);

const InHouseProperty = React.lazy(
  () => import("@/pages/admin/property/inHouseProperty/InHouseProperty")
);

const EditProperty = React.lazy(
  () => import("@/pages/admin/property/EditProperty")
);
const FeaturedProperties = React.lazy(
  () => import("@/pages/admin/property/FeaturedProperties")
);
const SoldProperties = React.lazy(
  () => import("@/pages/admin/property/SoldProperties")
);
const RentedProperties = React.lazy(
  () => import("@/pages/admin/property/RentedProperties")
);

const BrokersProperty = React.lazy(
  () => import("@/pages/admin/property/brokers/BrokersProperty")
);

const InHouseRentedProperties = React.lazy(
  () => import("@/pages/admin/property/inHouseProperty/InHouseRentedProperties")
);

const CreateInHouseProperty = React.lazy(
  () => import("@/pages/admin/property/inHouseProperty/CreateInHouseProperty")
);
const PropertyDetail = React.lazy(
  () => import("@/pages/admin/property/PropertyDetail")
);

const PropertyType = React.lazy(
  () => import("@/pages/admin/propertyTypes/PropertyType")
);

const FeaturedPropertyRequest = React.lazy(
  () => import("@/pages/admin/adsRequest/FeaturedPropertyRequest")
);
const FeaturedPropertyRequestDetail = React.lazy(
  () => import("@/pages/admin/adsRequest/FeaturedPropertyRequestDetail")
);

const BannerAdsRequest = React.lazy(
  () => import("@/pages/admin/adsRequest/BannerAdsRequest")
);
// const BannerAds = React.lazy(() => import("@/pages/admin/ads/BannerAds"));
const BannerAdsDetail = React.lazy(
  () => import("@/pages/admin/ads/BannerAdsDetail")
);

const BannerRequestDetails = React.lazy(
  () => import("@/pages/admin/adsRequest/BannerDetails")
);
const Chat = React.lazy(() => import("@/pages/common/chat/Chat"));
const Notification = React.lazy(
  () => import("@/pages/admin/notifications/Notification")
);
const SendNotification = React.lazy(
  () => import("@/pages/admin/notifications/SendNotification")
);

//ads
const PropertyAds = React.lazy(() => import("@/pages/admin/ads/PropertyAds"));
const PropertyReport = React.lazy(
  () => import("@/pages/admin/reports/PropertyReport")
);
const PropertyReportDetail = React.lazy(
  () => import("@/pages/admin/reports/PropertyReportDetail")
);
// "reported-properties
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/general-settings" element={<GeneralSetting />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/owners" element={<Owners />} />

      <Route path="/chat" element={<Chat />} />
      <Route path="/property-types" element={<PropertyType />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/send-notification" element={<SendNotification />} />

      {/* report */}
      <Route path="reported-properties">
        <Route path="" element={<PropertyReport />} />
        <Route path="detail/:id" element={<PropertyReportDetail />} />
      </Route>
      <Route path="ads">
        <Route path="property" element={<PropertyAds />} />
        <Route path="banner" element={<AdminBannerAds />} />
        <Route path="banner/detail/:id" element={<BannerAdsDetail />} />
      </Route>
      <Route path="requests">
        <Route path="featured-property" element={<FeaturedPropertyRequest />} />
        <Route
          path="featured-property/detail/:id"
          element={<FeaturedPropertyRequestDetail />}
        />
        <Route path="banner-ads" element={<BannerAdsRequest />} />
        <Route
          path="banner-ads/detail/:id"
          element={<BannerRequestDetails />}
        />
      </Route>
      <Route path="brokers">
        <Route path="" element={<Brokers />} />
        <Route path="detail/:id" element={<BrokerDetail />} />
      </Route>
      <Route path="/billings" element={<Payments />} />
      <Route path="/brokers-requests" element={<BrokerRequests />} />
      <Route
        path="/brokers-requests/detail/:id"
        element={<BrokerRequestDetail />}
      />
      <Route path="/packages" element={<Packages />} />
      <Route path="/listing-packages" element={<PackageRequests />} />
      <Route
        path="/listing-packages/detail/:id"
        element={<PackageRequestDetail />}
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="properties">
        <Route path="in-house" element={<InHouseProperty />} />
        <Route path="featured" element={<FeaturedProperties />} />
        <Route path="brokers" element={<BrokersProperty />} />
        <Route path="sold-out" element={<SoldProperties />} />
        <Route path="rented" element={<RentedProperties />} />
        <Route path="in-house/create" element={<CreateInHouseProperty />} />
        <Route path="edit/:id" element={<EditProperty />} />
        <Route path="in-house/rented" element={<InHouseRentedProperties />} />
        <Route path="detail/:id" element={<PropertyDetail />} />
      </Route>
      <Route path="agents">
        <Route
          path="in-house"
          element={
            <ProtectedRoute
              requiredPermissions={["editProfile"]}
              userPermissions={["editProfile"]}
            >
              <InHouseAgents />
            </ProtectedRoute>
          }
        />
        {/* Other routes for agents */}
        <Route path="in-house" element={<InHouseAgents />} />
      </Route>
    </Routes>
  );
};
