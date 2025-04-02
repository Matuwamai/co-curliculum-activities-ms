import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    await prisma.$connect();
    console.log("Connected to database");
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});

export default prisma;
