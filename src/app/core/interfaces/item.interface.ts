import { ICategory } from './category.interface';


export interface IItem {
    name: string;
    category: ICategory;
    color: string;
    ready_in: string;

}