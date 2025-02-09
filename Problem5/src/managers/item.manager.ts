import {
  CreateItem,
  ItemRepository,
  RetrieveItems,
  RetrieveItemsFilters,
  UpdateItem,
} from './types';
import { IItem } from '../models/Item';
import { SQLPersistor } from '../persistors/sqlite';

class ItemManager {
  constructor(private repository: ItemRepository) {}

  public async fetchItems(
    filters?: RetrieveItemsFilters,
  ): Promise<RetrieveItems[]> {
    return await this.repository.fetch(filters);
  }

  public async fetchOne(id: number): Promise<IItem> {
    return await this.repository.fetchOne(id);
  }

  public async createItem(data: CreateItem): Promise<IItem> {
    return await this.repository.create(data);
  }

  public async updateItem(data: UpdateItem): Promise<IItem> {
    return await this.repository.update(data);
  }

  public async deleteItem(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export default new ItemManager(new SQLPersistor());
