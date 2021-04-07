import { IUserData } from './user.interface';
import { IOffer } from './offer.interfaces';
import { IPaginatedResponse } from './paginator-response.interface';

export interface IComment {
  id: number;
  owner: IUserData;
  offer: IOffer;
  content: string;
  date: Date;
}

export interface ICommentAdd {
  content: string;
  offer: number;
}

export interface ICommentPaginatedResponse extends IPaginatedResponse {
  results: IComment[];
}
