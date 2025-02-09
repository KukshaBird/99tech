export interface IItem {
  id: number;
  name: string;
  details: string;
}

export interface GetItemsQuery {
  id?: string;
  name?: string;
}

export type GetItemsResponse = IItem[];

export type GetItemDetailsParams = { id: string };

export type GetItemDetailsResponse = IItem[];

export interface PostCreateItemReq {
  name: string;
  details: string;
}

export interface PutItemReq extends Partial<IItem> {
  id: number;
}

export type PutItemRes = IItem;
