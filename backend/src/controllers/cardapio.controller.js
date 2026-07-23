import prisma from "../lib/prisma.js";
export async function createRefeicao(req, res){
    try {
        const tiposPerm = ["GESTOR"];
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Perfil sem permissão para esta ação." });
        }
        const refeicao = req.body.novo;
        if (!refeicao) {
            return res.status(400).json({ message: "Dados para refeição não enviados, tente novamente." });
        }
        const camposObrigatorios = ['nome', 'descricao', 'data'];
        const campoFaltando = camposObrigatorios.find(campo => !refeicao[campo]);
        if (campoFaltando) {
            return res.status(400).json({ 
                message: `O campo '${campoFaltando}' é obrigatório para cadastrar a refeição.` 
            });
        }
        const novaRefeicao = await prisma.cardapio.create({
            data: {
                nome_ref: refeicao.nome,
                descricao_ref: refeicao.descricao,
                data_ref: new Date(`${refeicao.data}T00:00:00.000Z`)
            }
        });
        return res.status(201).json({
            message: "Refeição criada com sucesso!"
        });
    } catch (error) {
        console.error("Erro ao criar refeição:", error);
        return res.status(500).json({ message: "Erro interno no servidor ao cadastrar refeição." });
    }
}
export async function excludeRefeicao(req,res){
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user.tipo)){
            return res.status(403).json({message:"Tipo de usuario não autorizado, tente novamente..."})
        }
        const {data} = req.params
        if(!data){
            return res.status(400).json({message:"A data não foi enviada, tente novamente"})
        }
        const dataFormatada = new Date(`${data}T00:00:00.000Z`);
        const resultado =await prisma.cardapios.delete({
            where: {
                data_ref:data
            }
        })
        return res.status(204).send()
    }catch(error){
        console.log(error)
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhuma refeição encontrada para esta data." });
        }
        return res.status(500).json({message:"Erro interno no Servidor"})
    }
}

export async function updateRefeicao(req,res){
    try{
        const tiposPerm = ["GESTOR"]
        if(!tiposPerm.includes(req.user)){
            return res.status(403).json({message:"Tipo de usuario enão autorizado, tente em outro..."})
        }
        const {data} = req.params
        if(!data){
            return res.status(400).json({massge:"Data não recebida, tente novamente"})
        }
        // Mudar para uma linha somente
        const descricao = req.body.descricao
        if(!descricao){
            return res.status(400).json({message:"Nova descrição não recebida, tente novamente..."})
        }
        await prisma.cardapios.update({
            where: {
                data_ref:data
            },
            data: {
                descricao_ref:descricao
            }
        })
        return res.status(200).json({message:"Refeição Atualizada com sucesso! "})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Erro interno no Servidor..."})
    }
}