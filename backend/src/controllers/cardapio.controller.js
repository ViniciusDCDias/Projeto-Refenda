import prisma from "../lib/prisma";
export async function createRefeicao(req,res) {
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user.tipo)){
        return res.status(401).json({message:"Tipo de Usuario Invalido, Tente novamente..."})
        }
    }catch(error){

    }
}