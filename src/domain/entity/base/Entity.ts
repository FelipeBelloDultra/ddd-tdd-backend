import { randomUUID } from "crypto";

export abstract class Entity<T> {
  protected readonly props: T;
  protected readonly _id: string;

  get id(): string {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id || randomUUID();
  }
}
