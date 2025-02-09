import { NextFunction, Request, Response } from 'express';
import Database from 'better-sqlite3';
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

const db = new Database('resource.db');

export const getItems = async (
  req: Request<never, never, never, GetItemsQuery>,
  res: Response<GetItemsResponse>,
  next: NextFunction,
): Promise<void> => {
  const { id, name } = req.query;

  const params = [];
  let query = 'SELECT id, name from items WHERE 1=1';
  if (id) {
    query += ' AND id = ?';
    params.push(id);
  }
  if (name) {
    query += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }

  try {
    const items = db.prepare(query).all(...params) as GetItemsResponse;
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
    const item = db
      .prepare('SELECT * from items WHERE id = ?')
      .get(id) as GetItemDetailsResponse;

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
  const { details, name } = req.body;

  try {
    const item = db
      .prepare('INSERT INTO items (name, details) VALUES (?, ?)')
      .run(name, details);
    res.status(201).send({ id: Number(item.lastInsertRowid), name, details });
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

  const itemToPut = db
    .prepare('SELECT * FROM items WHERE id = ?')
    .get(id) as IItem;
  if (!itemToPut) {
    res.status(404).send();
  }

  try {
    db.prepare('UPDATE items SET name = ?, details = ? WHERE id = ?').run(
      updateData.name,
      updateData.details,
      id,
    );
    const updated = db
      .prepare('SELECT * FROM items WHERE id = ?')
      .get(id) as IItem;
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
    const itemToDel = db
      .prepare('SELECT * FROM items WHERE id = ?')
      .get(id) as IItem;
    if (!itemToDel) {
      res.status(404).send();
      return;
    }
    db.prepare('DELETE FROM items WHERE id = ?').run(id);
    res.sendStatus(204);
    return;
  } catch (err: any) {
    next(err);
    return;
  }
};
