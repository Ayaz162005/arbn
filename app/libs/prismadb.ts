import { PrismaClient } from "@prisma/client";
console.log("dssd");
// declare global {
//   var prisma: PrismaClient | undefined;
// }

const client = new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
// console.log(client);
if (client) {
  console.log("dfdddff");
}

export default client;
