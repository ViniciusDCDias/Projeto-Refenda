import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
let identificador = "290146"
const existe = await prisma.usuarios.findFirst({
    where:{
        OR:[
            {email:identificador},
            {ra:identificador}]}})

if(!existe){
    console.log("Errado")
}else{
    console.log(existe)
}