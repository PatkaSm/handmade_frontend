export interface ICategory {
  id: number;
  name: string;
  parent?: ICategory;
  children?: ICategory[];
  img: string;
}
