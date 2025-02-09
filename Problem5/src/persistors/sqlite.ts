import Database from 'better-sqlite3';

import { IItem } from '../models/Item';
import { BasePersistor } from './types';

class SQLPersistor implements BasePersistor<IItem> {
  private db = new Database('resource.db');

  public async fetch(filters?: Partial<IItem>): Promise<IItem[]> {
    if (filters && (filters.name || filters.id)) {
      const { id, name } = filters;

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

      return Promise.resolve(this.db.prepare(query).all(...params) as IItem[]);
    } else {
      return Promise.resolve(
        this.db.prepare('SELECT id, name from items').all() as IItem[],
      );
    }
  }

  public async create(data: Omit<IItem, 'id'>): Promise<IItem> {
    const result = this.db
      .prepare('INSERT INTO items (name, details) VALUES (?, ?)')
      .run(data.name, data.details);

    const created = this.db
      .prepare('SELECT * FROM items WHERE id = ?')
      .get(result.lastInsertRowid) as IItem;
    return Promise.resolve(created);
  }

  public update(data: Partial<IItem> & { id: IItem['id'] }): Promise<IItem> {
    this.db
      .prepare('UPDATE items SET name = ?, details = ? WHERE id = ?')
      .run(data.name, data.details, data.id);
    const updated = this.db
      .prepare('SELECT * FROM items WHERE id = ?')
      .get(data.id) as IItem;
    return Promise.resolve(updated);
  }

  public async fetchOne(id: number): Promise<IItem> {
    return Promise.resolve(
      this.db.prepare('SELECT * FROM items WHERE id = ?').get(id) as IItem,
    );
  }

  public async delete(id: number): Promise<void> {
    this.db.prepare('DELETE FROM items WHERE id = ?').run(id);
    return Promise.resolve();
  }
}

export { SQLPersistor };
