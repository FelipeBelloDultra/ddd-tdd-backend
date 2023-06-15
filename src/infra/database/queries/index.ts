import { PrismaClient } from "@prisma/client";

export const queries = new PrismaClient({
  log: ["query", "error"],
});
