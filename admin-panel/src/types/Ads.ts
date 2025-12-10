import { User } from "./Auth";
import { Broker } from "./Broker";
import { Payment } from "./Payment";
import { Property } from "./Property";

export enum AdsBannerStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export interface AdsBanner {
  _id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  status: AdsBannerStatus;
  broker: Broker;
  payment: Payment;
  isEdited: boolean;
  isApproved: boolean;
  isInHouseAd: boolean;
  isRejected: boolean;
}

export interface FeaturedProperty {
  _id: string;
  property: Property;
  user: User;
  viewCount: number;
  numberOfViews: number;
  isEnded: boolean;
  isRequestUpdate: number;
  broker: Broker;
  amount: number;
  status: AdsBannerStatus;
}
