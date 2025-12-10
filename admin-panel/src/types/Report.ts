import { ReportPropertyAction } from "@/utils/filter.enum";
import { User } from "./Auth";
import { Property } from "./Property";

export interface ReportedProperty {
  _id: string;
  user: User;
  property: Property;
  status: ReportPropertyAction;
  discription: string;
  createdAt: Date;
}
