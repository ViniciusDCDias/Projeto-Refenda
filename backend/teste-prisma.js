import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuarios.findMany();
  console.log(usuarios);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });