import { IImage } from './offer.interfaces';
import { IPaginatedResponse } from './paginator-response.interface';
import { IUserData } from './user.interface';

export interface IPost {
  id: number;
  title: string;
  content: string;
  gallery: IImage[];
  owner: IUserData;
  date_posted: Date;
}

export interface IPostsPaginatedResponse extends IPaginatedResponse {
  results: IPost[];
}
