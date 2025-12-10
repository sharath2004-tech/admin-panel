export interface BrokerRequest {
    _id: string;
    companyName: string;
    phone: string;
    email: string;
    logo: string;
    status: string;
    isApproved: boolean;
    isRejected: boolean;
  }
  
  export interface Broker {
    _id: string;
    name: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
    freeListingQuota: number;
  }
  