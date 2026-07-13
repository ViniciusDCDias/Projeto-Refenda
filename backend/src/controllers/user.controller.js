import prisma from '../lib/prisma.js'

export async function listUsers(req,res) {
    try{
        const usuarios = await prisma.usuarios.findMany({select:{nome_user:true,tipo_user:true,}})
        console.log(usuarios)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro interno no servidor"})
    }
}

export async function createUser(req,res) {
    
}

listUsers()