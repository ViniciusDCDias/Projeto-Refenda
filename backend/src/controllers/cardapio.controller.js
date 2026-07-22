import prisma from "../lib/prisma";
export async function createRefeicao(req, res) {
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