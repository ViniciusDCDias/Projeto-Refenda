import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

export async function login(req,res) {
    const {identificador,senha} = req.body

    if(!identificador || !senha){
        return res.status(400).json({message:"Dados faltando"})
    }

    const user = await prisma.usuarios.findFirst({
        where:{
            OR:[
                {email:identificador},
                {ra:identificador}
            ]}})
    if(!user){
        return res.status(409).json({message: "Usuario não encontrado"})
    }

    const senhaCorreta = await bcrypt.compare(senha,user.senha)

    if(!senhaCorreta){
        return res.status(401).json({message:"Senha Incorreta"})
    }
    //Cria o token para autenticar...
    const token = jwt.sign(
    {
      id: user.id_user,
      tipo: user.tipo_user
    },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Retorna p/ usuario o response
    return res.status(200).json(
        {
            token,
            user:{
                id:user.id_user,
                nome:user.nome_user,
                tipo:user.tipo_user
            }
        }
    )
    


}