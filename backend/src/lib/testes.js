import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const senha = "123456"
async function main() 
{
  const hashedVitor = await bcrypt.hash(senha,10)
  const Vitor = await prisma.usuarios.create(
    {
     data: {
        nome_user:"Vinicius Duarte",
        email:"viniciusdcenzi@gmail.com",
        senha:hashedVitor,
        tipo_user:"GESTOR",
        ra:null
     }
    }
  )
    const usuarios = await prisma.usuarios.findMany({
      select:{
          nome_user:true,
          tipo_user:true,
          email:true
      }})
    console.log(usuarios)
}
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });