import { IItem } from '../models/Item';

interface WithID {
  id: number | string;
}

interface Create<T extends WithID> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
}

interface Update<T extends WithID> {
  update: (data: Partial<T> & { id: T['id'] }) => Promise<T>;
}

interface Delete<T extends WithID> {
  delete: (id: T['id']) => Promise<void>;
}

interface Retrieve<T> {
  fetch(filters?: Partial<T>): Promise<T[]>;
}

interface CRUD<T extends WithID>
  extends Create<T>,
    Update<T>,
    Delete<T>,
    Retrieve<T> {}

interface RetrieveDetails<T extends WithID> {
  fetchOne(id: T['id']): Promise<T>;
}

interface BaseRepository<T extends WithID>
  extends CRUD<T>,
    RetrieveDetails<T> {}

export interface ItemRepository extends BaseRepository<IItem> {}

export interface RetrieveItemsFilters {
  id?: number;
  name?: string;
}

export interface RetrieveItems {
  id: number;
  name: string;
}

export interface UpdateItem extends Partial<IItem> {
  id: number;
}

export interface CreateItem extends Omit<IItem, 'id'> {}
