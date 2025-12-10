import { User } from "./Auth";

export interface CreateAgent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  whatsappNumber: string;
}

export type Agent = {
  _id: string;
  user: User | null;
  broker: User | null;
  whatsappNumber: string | null;
};
