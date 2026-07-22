import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const senha = "123456"
async function main() 
{
//   const hashedThiago = await bcrypt.hash("0008",10)
//   const hashedMiguel = await bcrypt.hash("1234",10)
  const hashedVitor = await bcrypt.hash(senha,10)
//   const Thiago = await prisma.usuarios.create(
//     {
//      data: {
//         nome_user:"Thiago",
//         email:"thiago.silva00@gmail.com",
//         senha:hashedThiago,
//         tipo_user:"ALUNO",
//         ra:"261010"
//      }
//     }
//   )
//   const Miguel = await prisma.usuarios.create(
//     {
//      data: {
//         nome_user:"Miguel Pietro",
//         email:"miguelpietrod@gmail.com",
//         senha:hashedMiguel,
//         tipo_user:"FUNCIONARIO",
//         ra:null
//      }
//     }
//   )
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
//     const hashedNeymar = await bcrypt.hash("Dellareti",10)
//     const Neymar = await prisma.usuarios.create(
//     {
//      data: {
//         nome_user:"Neymar",
//         email:"neymar.dellareti@cps.sp.gov.br",
//         senha:hashedNeymar,
//         tipo_user:"GESTOR",
//         ra:null
//      }
//     }
//   )
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