import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
export async function listUsers(req,res) {
    try{
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({
                message:"Tipo de usuario Invalido para esta ação..."
            })
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
            return res.status(403).json({
                message:"Tipo de usuario Invalido para esta ação..."
            })
        }
        const dadosUser = req.body.novo
        if (!dadosUser) {
            return res.status(400).json({
                message: "Dados do usuário não enviados."
            });
        }
        if(!["ALUNO","GESTOR","FUNCIONARIO"].includes(dadosUser.tipo)){
            return res.status(400).json({
                message:"Tipo de Usuario invalido!"
            })
        }
        const hashedSenha = await bcrypt.hash(dadosUser.senha,10)
        const data = {
            nome_user: dadosUser.nome,
            email: dadosUser.email,
            senha: hashedSenha,
            tipo_user: dadosUser.tipo,
            ra: null
        };

        if (dadosUser.tipo === "ALUNO") {
            if(!dadosUser.ra){
                return res.status(400).json({message:"RA invalido, tente novamente..."})
            }else{
                data.ra = dadosUser.ra;
            }
        }

        await prisma.usuarios.create({ data });
        return res.status(201).json({message:"Novo Usuario Adicionado!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}

export async function excludeUser(req,res) {
    try {
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario Invalido para esta ação..."})
        }
        const { email } = req.params; 
        
        await prisma.usuarios.delete({
            where: { email:email }
        });
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhum usuario foi encontrado com este email." });
        }
        return res.status(500).json({ message: 'Erro interno no Servidor' });
    }
}

export async function updateUser(req,res){
    try{
        // Isso nem precisa, mas coloquei por padrão
        const tiposPerm = ["GESTOR","ALUNO","FUNCIONARIO"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({
                message:"Tipo de Usuario invalído, troque e tente novamente..."
            })
        }
        const {identificador} = req.params
        const senha = req.body.newSenha
        if(!senha){
            return res.status(400).json({
                message:"A senha não pode ser vazia, preencha-a e tente novamente"
            })
        }
        const hashedSenha = await bcrypt.hash(senha,10)
        await prisma.usuarios.update({
            where: {
                OR:[
                    {email:identificador},
                    {id_user:identificador}
                ]
            },
            data: {
                senha:hashedSenha
            }
        }) 
        return res.status(200).json({
            messsage:`Senha redefinida com sucesso!`
        })

    }catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        console.error(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}