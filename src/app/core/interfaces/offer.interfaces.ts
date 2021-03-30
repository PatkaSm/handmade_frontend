import { IUserData } from './user.interface';
import { IItem } from './item.interface';
import { ITag } from './tag.inteface';
import { IComment } from './comment.interface';
import { IPaginatedResponse } from './paginator-response.interface';

export interface IOffer {
  id: number;
  owner: IUserData;
  item: IItem;
  amount: number;
  price: number;
  tag: ITag[];
  gender: string;
  description: string;
  comments: IComment[];
  gallery: { id: number; img?: string }[];
  date: Date;
  is_favourite: boolean;
  liked_by: { likes: number; users: IUserData[] };
  shipping_abroad: boolean;
}

export interface IOfferPaginatedResponse extends IPaginatedResponse {
  results: IOffer[];
}
