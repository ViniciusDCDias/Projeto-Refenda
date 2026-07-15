import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
export async function listUsers(req,res) {
    try{
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario Invalido para esta ação..."})
        }
        const usuarios = await prisma.usuarios.findMany({
            select:{
                nome_user:true,
                tipo_user:true,
                email:true
            }})
        return res.status(200).json(usuarios)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro interno no servidor"})
    }
}

export async function createUser(req,res) {
    try{
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario Invalido para esta ação..."})
        }
        const dadosUser = req.body.novo
        if(!["ALUNO","GESTOR","FUNCIONARIO"].includes(dadosUser.tipo)){
            return res.status(400).json({message:"Tipo de Usuario invalido!"})
        }
        const hashedSenha = await bcrypt.hash(dadosUser.senha,10)
        const data = {
            nome_user: dadosUser.nome,
            email: dadosUser.email,
            senha: hashedSenha,
            tipo_user: dadosUser.tipo,
        };

        if (dadosUser.tipo === "ALUNO") {
            data.ra = dadosUser.ra;
        }

        await prisma.usuarios.create({ data });
        return res.status(201).json({message:"Novo Usuario Adicionado!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}