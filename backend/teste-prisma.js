import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const senha = "123456"
async function main() 
{
  const hashedSenha = await bcrypt.hash(senha,10)
  const batata = await prisma.usuarios.create(
    {
     data: {
        nome_user:"Vinicius",
        email:"viniciusdcenzi@gmail.com",
        senha:hashedSenha,
        tipo_user:"GESTOR",
        ra:null
     }
    }
  )
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
