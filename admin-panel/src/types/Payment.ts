import { User } from "./Auth";
import { Broker } from "./Broker";
import { PaymentStatus } from "./Common";

export interface Payment {
  _id: string;
  user: User;
  broker: Broker;
  amount: string;
  email_address: string;
  description: string;
  currency: string;
  paymentMethod: string;
  paymentId: string;
  timestamp: string;
  status: PaymentStatus;
}
