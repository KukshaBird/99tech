export interface IItem {
  id: number;
  name: string;
  details: string;
}

export interface GetItemsQuery {
  id?: number;
  name?: string;
}

export type GetItemsResponse = Omit<IItem, 'details'>[];

export type GetItemDetailsParams = { id: string };

export type GetItemDetailsResponse = IItem;

export interface PostCreateItemReq {
  name: string;
  details: string;
}

export interface PutItemReq extends Partial<IItem> {}

export type PutItemRes = IItem;
