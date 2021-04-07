import { IPaginatedResponse } from './paginator-response.interface';
import { IUserData } from './user.interface';

export interface IThread {
  id: number;
  last_message: IMessage;
  user1: IUserData;
  user2: IUserData;
}

export interface IMessage {
  id: number;
  content: string;
  date_send: Date;
  user2: IUserData;
  thread: number;
  sender: IUserData;
}

export interface IThreadsPaginatedResponse extends IPaginatedResponse {
  results: IThread[];
}

export interface IMessagesPaginatedResponse extends IPaginatedResponse {
  results: IMessage[];
}
