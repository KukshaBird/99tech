export interface IItem {
  id: number;
  name: string;
  details: string;
}

class Item implements IItem {
  constructor(
    private readonly _id: number,
    private _name: string,
    private _details: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get details(): string {
    return this._details;
  }
}

export default Item;
