declare namespace Express {
  export interface Request {
    authenticatedId: string;
    authenticatedRole: string;
    authenticatedName: string;
    authenticatedEmail: string;
  }
}
