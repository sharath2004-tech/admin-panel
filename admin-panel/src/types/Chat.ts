import { Property } from "./Property";
import { User } from "./Auth";

export interface Conversation {
  _id: string;
  members: User[];
  last_message: {
    _id: string;
    conversation: string;
    property: Property;
    sender: string;
    receiver: string;
    readAt: string | null;
    message: string;
    createdAt:string;
  };
  unread_count:number
  createdAt:string;
}

export interface Message{
  _id:string;
  property:Property
  conversation:string;
  sender:User;
  receiver:User;
  readAt:string | null;
  message:string;
  createdAt:string;
}