export interface IOwnerForm{
    name:string;
    phone:number | undefined;
    email:string;
    address:string;
    logo:File | undefined
}

export interface Owner {
    _id: string;
    name: string;
    logo: string;
    address: string;
    phone: string;
    email: string;
  }
  