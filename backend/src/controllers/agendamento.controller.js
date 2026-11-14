import prisma from './../lib/prisma.js'
export async function CreateAgendamento(req,res){
    try{
        const tiposPerm = ["ALUNO","FUNCIONARIO"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario não autorizado"})
        }
        const id = req.user.id
        const data = new Date()
        if((data.getUTCHours()) + 180 + data.getUTCMinutes() >= 620){
            return res.status(403).json({message:"Você não pode agendar mais, já se passaram das 10:20"})
        }
        const dataFormatada = new Date(
            Date.UTC(
                data.getFullYear(),
                data.getMonth(),
                data.getDate()
            )
        );
        const id_refeicao = await prisma.cardapios.findFirst({
            where:{
                data_ref:dataFormatada
            },
            select:{
                id_ref: true
            }
        })
        if(!id_refeicao){
            return res.status(404).json({message:"Refeição não exixtente, tente novamente mais tarde!"})
        }
        const create = await prisma.agendamentos.create({
            data:{
                data_agen: dataFormatada,
                id_user:id,
                id_ref:id_refeicao.id_ref,
            }
        })
        return res.status(201).json({message:"Agendado com sucesso!"})
    }catch(error){
        if(error.code == "P2002"){
            return res.status(409).json({message:"Você já fez o agendamento do dia"})
        }
        console.log(error)
        return res.status(500).json({message:"Erro interno no servidor, tente novamente mais tarde..."})
    }
}

export async function CountAgendamentos(req,res){
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Você não tem autorização para fazer esta ação"})
        }
        const data = new Date()
        const dataFormatada = new Date(
            Date.UTC(
                data.getFullYear(),
                data.getMonth(),
                data.getDate()
            )
        )
        const refeicao = await prisma.cardapio.findFirst({
            where:{
                data_ref:dataFormatada
            }
        })
        const quantia = await prisma.agendamentos.count({
            where:{
                id_ref:refeicao.id_ref
            }
        })
        return res.status(200).json({quantia: quantia})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}

export async function consultarAgendamentos(req,res){
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.staus(403).json({message:"Você não tem autorização para fazer esta ação"})
        }
        const data = new Date()
        const dataFormatada = new Date(
            Date.UTC(
                data.getFullYear(),
                data.getMonth(),
                data.getDate()
            )
        )
        const id_refeicao = await prisma.cardapios.findFirst({
            where:{
                data_ref:dataFormatada
            },
            select:{
                id_ref:true
            }
        })
        const agendamentos = await prisma.agendamentos.findMany({
            where:{
                id_ref:id_refeicao.id_ref
            }
        })
        return res.status(200).json(agendamentos)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}
