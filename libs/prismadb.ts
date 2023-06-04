import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development (not affected by hot reloading)
const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = client;
}

export default client;
