import NotFound from "@/pages/common/NotFound";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = React.lazy(
  () => import("@/pages/brokers/dashboard/Dashboard")
);
const Notification = React.lazy(
  () => import("@/pages/brokers/notifications/Notification")
);

const MyProperty = React.lazy(
  () => import("@/pages/brokers/property/MyProperty")
);
const RentedProperties = React.lazy(
  () => import("@/pages/brokers/property/RentedProperties")
);
const SoldProperties = React.lazy(
  () => import("@/pages/brokers/property/SoldProperties")
);
const FeaturedProperty = React.lazy(
  () => import("@/pages/brokers/property/FeaturedProperty")
);

const BrokerAgents = React.lazy(
  () => import("@/pages/brokers/agents/BrokerAgents")
);

const CreateProperty = React.lazy(
  () => import("@/pages/brokers/property/CreateProperty")
);
const EditProperty = React.lazy(
  () => import("@/pages/brokers/property/EditProperty")
);

const PropertyDetail = React.lazy(
  () => import("@/pages/brokers/property/PropertyDetail")
);
const Packages = React.lazy(() => import("@/pages/brokers/packages/Package"));
const MyPackages = React.lazy(
  () => import("@/pages/brokers/packages/MyPackages")
);

const Banner = React.lazy(() => import("@/pages/brokers/ads/Banner"));
const BannerDetail = React.lazy(
  () => import("@/pages/brokers/ads/BannerDetail")
);

const CreateAd = React.lazy(() => import("@/pages/brokers/ads/CreateAd"));
const NewFeaturedPropertyRequest = React.lazy(
  () =>
    import(
      "@/pages/brokers/request/featuredProperty/NewFeaturedPropertyRequest"
    )
);
const FeaturedPropertyRequest = React.lazy(
  () =>
    import("@/pages/brokers/request/featuredProperty/FeaturedPropertyRequest")
);
const FeaturePropertyDetail = React.lazy(
  () => import("@/pages/brokers/request/featuredProperty/FeaturePropertyDetail")
);
//
const Chat = React.lazy(() => import("@/pages/common/chat/Chat"));
const PaymentHistory = React.lazy(
  () => import("@/pages/brokers/billing/PaymentHistory")
);
const Profile = React.lazy(() => import("@/pages/brokers/profile/Profile"));

export const BrokerRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/agents" element={<BrokerAgents />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/billing-history" element={<PaymentHistory />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/my-packages" element={<MyPackages />} />
      <Route path="ads">
        <Route path="banner" element={<Banner />} />
        <Route path="banner-detail/:id" element={<BannerDetail />} />
        <Route path="post-ad" element={<CreateAd />} />
        <Route path="featured-property" element={<FeaturedPropertyRequest />} />
        <Route
          path="featured-property/detail/:id"
          element={<FeaturePropertyDetail />}
        />
      </Route>
      <Route path="requests">
        <Route path="new-request" element={<NewFeaturedPropertyRequest />} />
      </Route>
      <Route path="properties">
        <Route path="all" element={<MyProperty />} />
        <Route path="rented" element={<RentedProperties />} />
        <Route path="sold" element={<SoldProperties />} />
        <Route path="featured" element={<FeaturedProperty />} />
        <Route path="create/new" element={<CreateProperty />} />
        <Route path="edit/:id" element={<EditProperty />} />
        <Route path="detail/:id" element={<PropertyDetail />} />
      </Route>
    </Routes>
  );
};
