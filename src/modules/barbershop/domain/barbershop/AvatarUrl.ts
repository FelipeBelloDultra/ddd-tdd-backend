import { Either, right } from "@core/logic/Either";

export class AvatarUrl {
  private readonly url: string;

  get value(): string {
    return this.url;
  }

  private constructor(url: string) {
    this.url = url;
  }

  static create(url: string): Either<void, AvatarUrl> {
    return right(new AvatarUrl(url));
  }
}
