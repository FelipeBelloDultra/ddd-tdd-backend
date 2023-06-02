import { DomainError } from "./DomainError";

export class InvalidJwtTokenError extends Error implements DomainError {
  constructor() {
    super("The JWT token is invalid.");
    this.name = "InvalidJWTTokenError";
  }
}
