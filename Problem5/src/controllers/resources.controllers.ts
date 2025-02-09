import { NextFunction, Request, Response } from 'express';
import {
  GetItemDetailsParams,
  GetItemDetailsResponse,
  GetItemsQuery,
  GetItemsResponse,
  IItem,
  PostCreateItemReq,
  PutItemReq,
  PutItemRes,
} from './types';
import ItemManager from '../managers/item.manager';

export const getItems = async (
  req: Request<never, never, never, GetItemsQuery>,
  res: Response<GetItemsResponse>,
  next: NextFunction,
): Promise<void> => {
  const filters = req.query;

  try {
    const items = await ItemManager.fetchItems(filters);
    res.status(200).send(items);
    return;
  } catch (err: any) {
    next(err);
    return;
  }
};

export const getItemDetails = async (
  req: Request<GetItemDetailsParams, never, never, never>,
  res: Response<GetItemDetailsResponse>,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const item = await ItemManager.fetchOne(Number(id));

    if (item) {
      res.status(200).send(item);
      return;
    } else {
      res.status(404).send();
      return;
    }
  } catch (err: any) {
    next(err);
    return;
  }
};

export const postCreateItem = async (
  req: Request<never, never, PostCreateItemReq, never>,
  res: Response<IItem>,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemManager.createItem(req.body);
    res.status(201).send(item);
    return;
  } catch (err: any) {
    next(err);
    return;
  }
};

export const putUpdateItem = async (
  req: Request<{ id: string }, never, PutItemReq, never>,
  res: Response<PutItemRes>,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;

  const itemToPut = ItemManager.fetchOne(Number(id));
  if (!itemToPut) {
    res.status(404).send();
  }

  try {
    const updated = await ItemManager.updateItem({
      id: Number(id),
      ...updateData,
    });
    res.status(200).send(updated);
    return;
  } catch (err: any) {
    next(err);
    return;
  }
};

export const deleteItem = async (
  req: Request<{ id: string }, never, never, never>,
  res: Response<never>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const itemToDel = ItemManager.fetchOne(Number(id));
    if (!itemToDel) {
      res.status(404).send();
      return;
    }
    await ItemManager.deleteItem(Number(id));
    res.sendStatus(204);
    return;
  } catch (err: any) {
    next(err);
    return;
  }
};
