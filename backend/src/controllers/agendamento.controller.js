import prisma from 'prisma.js'
export async function CreateAgendamento(req,res){
    try{
        const tiposPerm = ["ALUNO","GESTOR"]
        if(!tiposPerm.includes(req.user)){
            return res.status(403).json({message:"Tipo de usuario não autorizado"})
        }
        const { id } = req.params
        if(!id){
            return res.status(400).json({message:"O usuario não foi enviado, tente novamente mais tarde..."})
        }
        const data = new Date()
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
        const create = await prisma.agendamentos.create({
            data:{
                data_agen: dataFormatada,
                id_user:id,
                id_ref:id_refeicao,
            }
        })
        return res.status(201).json({message:"Agendado com sucesso!"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro interno no servidor, tente novamente mais tarde..."})
    }
}

export async function CountAgendamentos(req,res){
    try{
        const data = new Date()
        const dataFormatada = new Date(
            Date.UTC(
                data.getFullYear(),
                data.getMonth(),
                data.getDate()
            )
        )
        const quantia = await prisma.agendamentos.count({
            where:{
                data_ref:dataFormatada
            }
        })
        return res.status(200).json({
            quantia: quantia
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}