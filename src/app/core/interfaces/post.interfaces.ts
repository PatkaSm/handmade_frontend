import { IUserData } from './user.interface';

export interface IPost {
  id: number;
  owner: IUserData;
  title: string;
  content: string;
  gallery: { id: number; img: string }[];
  date_posted: Date;
}
