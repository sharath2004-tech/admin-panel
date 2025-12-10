export type ILogin = {
    email: string;
    password: string;
  };
  export enum Role {
    User = 'user',
    Admin = 'Admin',
    Agent = 'Agent',
    Broker = 'Broker',
  }
  
  export type User = {
    broker?:string;
    _id:string
    firstName: string;
    lastName: string;
    profile_image:string;
    phone: number;
    email:string;
    permissions:string[];
    role:Role
    updatedAt:Date
  };
  export interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    user: null | User ;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loaded: boolean;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    login: (token: string, user: User) => void;
    logout:()=>void
  }
  