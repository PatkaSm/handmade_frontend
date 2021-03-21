import { IUserData } from './user.interface';
import { IOffer } from './offer.interfaces';

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
