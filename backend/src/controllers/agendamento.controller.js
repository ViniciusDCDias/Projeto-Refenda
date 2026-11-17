import prisma from './../lib/prisma.js'

function hojeSemHorario(timeZone = "America/Sao_Paulo") {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const ano = Number(partes.find((p) => p.type === "year").value);
  const mes = Number(partes.find((p) => p.type === "month").value);
  const dia = Number(partes.find((p) => p.type === "day").value);

  return new Date(Date.UTC(ano, mes - 1, dia)); // meia-noite UTC
}

export async function CreateAgendamento(req,res){
    try{
        const tiposPerm = ["ALUNO","FUNCIONARIO"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario não autorizado"})
        }
        const id = req.user.id
        let timeZone = "America/Sao_Paulo"
        const dataS =  new Intl.DateTimeFormat("en-CA", {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date());
        const horario = new Intl.DateTimeFormat("en-GB", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }).format(new Date())
        const [hora, minuto] = horario.split(":").map(Number)
        const minutosTotais = hora * 60 + minuto
        if (minutosTotais >= 620) {
            return res.status(403).json({
                message: "O prazo para agendamento encerrou às 10:20"
            })
        }
        const dataFormatada = hojeSemHorario()
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
        await prisma.agendamentos.create({
            data:{
                data_agen: data,
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
        const data = hojeSemHorario()
        const refeicao = await prisma.cardapios.findFirst({
            where:{
                data_ref:data
            }
        })
        if(!refeicao){
            return res.status(404).json({message:"Não há refeição configurada para hoje"})
        }
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

export async function consultarAgen(req,res){
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Você não tem autorização para fazer esta ação"})
        }
        const data = hojeSemHorario()
        const id_refeicao = await prisma.cardapios.findFirst({
            where:{
                data_ref:data
            },
            select:{
                id_ref:true
            }
        })
        if(!id_refeicao){
            return res.status(404).json({message:"Refeição não encontrada para o dia de hoje"})
        }
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

export async function consultarAgenUser(req,res){
    try{
        const tiposPerm = ["FUNCIONARIO","ALUNO"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Você não tem autorização para acessar este recurso"})
        }
        const idUser = req.user.id
        const data = new Date()
        const primeiro = new Date(
            Date.UTC(
                data.getUTCFullYear(),
                data.getUTCMonth(),
                1
            )
        )
        const ultimo = new Date(
            Date.UTC(
                data.getUTCFullYear(),
                data.getUTCMonth() + 1,
                0
            )
        )
        const idsRefeicoes = await prisma.cardapios.findMany({
            where:{
                data_ref:{
                    gte: primeiro,
                    lte: ultimo
                }
            },
            select:{
                id_ref:true
            }
        })
        let agendamentos = []
        for(let i=0 ; i<idsRefeicoes.length ; i++ ){
            const agen = await prisma.agendamentos.findUnique({
                where:{
                    likeId:{
                        id_ref:idsRefeicoes[i].id_ref,
                        id_user:idUser
                    }
                }
            })
            if(agen){
                agendamentos.push(agen)
            }
        }
        if(agendamentos.length === 0){
            return res.status(200).json({message:"O usuario não tem agendamentos no mês"})
        }
        return res.status(200).json({message:"O usuario possui agendamentos no mês",agendamentos})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}
