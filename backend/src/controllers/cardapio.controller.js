import prisma from "../lib/prisma.js"
export async function createRefeicao(req, res) {
    try {
        const tiposPerm = ["GESTOR"]
        if (!tiposPerm.includes(req.user.tipo)) {
            return res.status(403).json({ message: "Tipo de usuário não autorizado, tente novamente..." })
        }
        const refeicao = req.body;
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
        const novaRefeicao = await prisma.cardapios.create({
            data: {
                nome_ref: refeicao.nome,
                descricao_ref: refeicao.descricao,
                data_ref: new Date(`${refeicao.data}`)
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
        const dataFormatada = new Date(
            Date.UTC(
                diaHoje.getFullYear(),
                diaHoje.getMonth(),
                diaHoje.getDate()
            )
        );
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
            return res.status(400).json({message:"Informações obrigatorias não foram enviadas, tente novamente."})
        }
        const diaHoje = new Date(data)
        const dataFormatada = new Date(
            Date.UTC(
                diaHoje.getFullYear(),
                diaHoje.getMonth(),
                diaHoje.getDate()
            )
        );
        await prisma.cardapios.update({
            where: {
                data_ref:dataFormatada
            },
            data:{
                descricao_ref:descricao
            }
        })
        return res.status(200).json({message:"Refeição Atualizada com sucesso!"})
    }catch(error){
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Nenhuma refeição encontrada para esta data." })
        }
        console.log(error)
        return res.status(500).json({message:"Erro Interno no Servidor"})
    }
}

function hojeSemHorario(timeZone = "America/Sao_Paulo") {
  const partes = new Intl.DateTimeFormat("en-US", {
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

export async function CardapioSemana(req, res) {
  try {
    const hoje = hojeSemHorario();
    const diaHoje = hoje.getUTCDay();

    let diferenca;
    if (diaHoje === 0) diferenca = 1;
    else if (diaHoje === 6) diferenca = 2;
    else diferenca = 1 - diaHoje;

    const segunda = new Date(hoje);
    segunda.setUTCDate(hoje.getUTCDate() + diferenca);

    const sexta = new Date(segunda);
    sexta.setUTCDate(segunda.getUTCDate() + 4);

    const refeicoes = await prisma.cardapios.findMany({
        where:{
            data_ref:{
                gte:segunda,
                lte: sexta
            }
        }
    })
    console.log(segunda)
    console.log(sexta)
    console.log(refeicoes)
    return res.status(200).json({ refeicoes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro Interno no Servidor" });
  }
}


export async function cardapioDia(req, res) {
    try {
        const diaHoje = new Date();
        const dataFormatada = new Date(
            Date.UTC(
                diaHoje.getFullYear(),
                diaHoje.getMonth(),
                diaHoje.getDate()
            )
        );
        const refeicao = await prisma.cardapios.findFirst({
            where: {
                data_ref: dataFormatada
            }
        });
        if (!refeicao) {
            return res.status(404).json({
                message: "Não há cardápio para hoje"
            });
        }
        return res.status(200).json(refeicao);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro Interno no Servidor"
        });
    }
}