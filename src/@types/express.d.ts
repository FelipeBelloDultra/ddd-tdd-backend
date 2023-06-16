declare namespace Express {
  export interface Request {
    authenticatedId: string;
    authenticatedPermissions: string;
    authenticatedName: string;
    authenticatedEmail: string;
  }
}
