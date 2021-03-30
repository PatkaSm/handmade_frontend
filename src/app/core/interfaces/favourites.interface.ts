import { IOffer } from './offer.interfaces';
import { IPaginatedResponse } from './paginator-response.interface';
import { IUserData } from './user.interface';

export interface IFavourite {
  offer: IOffer;
  user: IUserData;
}

export interface IFavouritePaginatedResponse extends IPaginatedResponse {
  results: IFavourite[];
}
