import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Para usar nos controller e não ter que ficar importando sempre
export default prisma;