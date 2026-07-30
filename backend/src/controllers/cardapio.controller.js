import prisma from "../lib/prisma"
export async function createRefeicao(req, res) {
    try {
        const tiposPerm = ["GESTOR"];
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." });
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

export async function excludeRefeicao(req, res) {
    try {
        const tiposPerm = ["GESTOR"];
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." });
        }
        const { data } = req.params;
        if (!data) {
            return res.status(400).json({ message: "A data não foi enviada, tente novamente." });
        }
        const dataFormatada = new Date(`${data}T00:00:00.000Z`);
        await prisma.cardapios.delete({
            where: {
                data_ref: dataFormatada
            }
        });
        return res.status(200).json({ message: "Refeição excluída com sucesso!" });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhuma refeição encontrada para esta data." });
        }
        console.error("Erro ao excluir refeição:", error);
        return res.status(500).json({ message: "Erro interno no Servidor" });
    }
}