import prisma from "../lib/prisma"
export async function createRefeicao(req, res) {
    try {
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." })
        }
        const refeicao = req.body.novo;
        if (!refeicao) {
            return res.status(400).json({ message: "Dados para refeição não enviados, tente novamente." })
        }
        const camposObrigatorios = ['nome', 'descricao', 'data']
        const campoFaltando = camposObrigatorios.find(campo => !refeicao[campo])
        if (campoFaltando) {
            return res.status(400).json({ 
                message: `O campo '${campoFaltando}' é obrigatório para cadastrar a refeição.` 
            })
        }
        const novaRefeicao = await prisma.cardapio.create({
            data: {
                nome_ref: refeicao.nome,
                descricao_ref: refeicao.descricao,
                data_ref: new Date(`${refeicao.data}T00:00:00.000Z`)
            }
        })
        return res.status(201).json({
            message: "Refeição criada com sucesso!"
        })
    } catch (error) {
        console.error("Erro ao criar refeição:", error)
        return res.status(500).json({ message: "Erro interno no servidor ao cadastrar refeição." })
    }
}

export async function excludeRefeicao(req, res) {
    try {
        const tiposPerm = ["GESTOR"];
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." })
        }
        const { data } = req.params
        if (!data) {
            return res.status(400).json({ message: "A data não foi enviada, tente novamente." })
        }
        const dataFormatada = new Date(`${data}T00:00:00.000Z`)
        await prisma.cardapios.delete({
            where: {
                data_ref: dataFormatada
            }
        })
        return res.status(200).json({ message: "Refeição excluída com sucesso!" })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhuma refeição encontrada para esta data." })
        }
        console.error("Erro ao excluir refeição:", error)
        return res.status(500).json({ message: "Erro interno no Servidor" })
    }
}

export async function updateRefeicao(req,res){
    try{
        const tiposPerm = ["GESTOR"];
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." });
        }
        const {data} = req.params
        const descricao = req.body.descricao
        if(!data || !descricao){
            return res.status(400).json({message:"Informações obridatorias não foram enviadas, tente novamente."})
        }
        const dataFormatada = new Date(`${data}T00:00:00.000Z`)
        await prisma.cardapios.update({
            where: {
                data_ref:dataFormatada
            },
            data:{
                descricao_ref:descricao
            }
        })
        return res.status(200).json({message:"Refeição excluida com sucesso!"})
    }catch(error){
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhuma refeição encontrada para esta data." })
        }
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}

export async function cardapioSemana(req,res){
    try{
        const tiposPerm = ["Gestor"]
        if(!tiposPerm.includes(req.user)){
            return res.status(403).json({message:"Tipo de Usuario não Autorizado, tente novamente..."})
        }
        const dataHoje = new Date()
        const dia = dataHoje.getDate()
        const diaHoje = dataHoje.getDay()
        if(diaHoje == 0){
            console.log("Hoje é Domingo")
            const diaSegunda = new Date()
        }else if(diaHoje == 1){
            console.log("Hoje é Segunda!!")
        }else if(diaHoje == 2){
            console.log("Hoje é Terça!")
        }else if(diaHoje == 3){
            console.log("Hoje é Quarta")
        }else if(diaHoje == 4){
            console.log("Hoje é Quinta")
        }else if(diaHoje == 5){
            console.log("Hoje é Sexta")
        }else if(diaHoje == 6){
            console.log("Hoje é Sabado")
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}