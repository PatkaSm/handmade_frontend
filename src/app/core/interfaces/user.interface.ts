import { IOffer } from './offer.interfaces';

export interface ILoginData {
  username: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface IUserData {
  id?: number;
  nickname?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: number;
  city?: string;
  image?: string;
  offers?: IOffer[];
  posts?: any[];
  active?: boolean;
  staff?: boolean;
  admin?: boolean;
}
