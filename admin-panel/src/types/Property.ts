import { User } from "./Auth";

export interface PropertyForm {
  name: string;
  images: File[];
  videoTour?: File | undefined;
  price: number | undefined;
  currency: string;
  description: string;
  paymentDescription: string;
  type?: string;
  propertyType: string;
  propertyHomeType: string;
  details: {
    area: number | undefined; //in square
    bedroom: number | undefined;
    bathroom: number | undefined;
    yearBuilt: number | undefined;
    floor?: number | undefined;
  };
  views?: number | undefined;
  owner: string;
  agent: string;
  address: {
    location: string;
    city: string;
    loc: Array<number>;
  };
  isFeatured: boolean | undefined;
  isFurnished: boolean | undefined;
  amenities: Array<string>;
  facilities: {
    facility: string;
    distance: number;
  }[];
}

interface Images {
  _id: string;
  url: string;
}
export interface Property {
  _id: string;
  name: string;
  images: Images[];
  videoTour?: string | undefined;
  price: number;
  currency: string;
  description: string;
  paymentDescription: string;
  type?: string;
  propertyType: string;
  details: {
    area: number; //in square
    bedroom: number;
    bathroom: number;
    yearBuilt: number;
    floor?: number | undefined;
  };
  views?: number;
  owner: {
    name: string;
  };
  broker: {
    name: string;
  };
  agent: string;
  address: {
    location: string;
    city: string;
    loc: Array<number>;
  };
  isFeatured: boolean | undefined;
  isFurnished: boolean | undefined;
  isApproved?: boolean;
  amenities: Array<string>;
}

export interface PropertyRate {
  _id: string;
  user: User;
  review: string;
  rate: number;
  createdAt: string;
}


export interface PropetyTypeData{
  _id:string;
  name:string;
}