import { User } from "./Auth";
import { Broker } from "./Broker";
import { PackageStatus } from "./Common";
import { Payment } from "./Payment";

export interface PackageForm {
  name: string;
  description: string;
  maxListingsAllowed: number | undefined;
  price: number | undefined;
}

export interface Package {
  _id: string;
  name: string;
  description: string;
  maxListingsAllowed: number;
  price: number;
}

export interface PackageData {
  _id: string;
  package: {
    _id: string;
    name: string;
    description: string;
    maxListingsAllowed: number;
    price: number;
    remining: number;
  };
  isActive: boolean;
  createdAt: string;
  status: PackageStatus;
  user: User;
}

export interface BrokerPackage {
  _id: string;
  package: Package;
  broker: Broker;
  isActive: boolean;
  status: PackageStatus;
  payment:Payment
}
