import prisma from "./src/lib/prisma.js"
export async function CardapioSemana(){
    try{
        const dataHoje = new Date()
        dataHoje.setHours(0,0,0,0)
        const diaHoje = dataHoje.getDay()

        let diferenca;

        if( diaHoje === 0){
            diferenca = 1
        }else if(diaHoje === 1){
            diferenca = 2
        }else{
            diferenca = 1 - diaHoje
        }
        //Define Segunda Feira apartir da diferença entre o Hoje e Ela
        const segunda = new Date(dataHoje)
        segunda.setDate(dataHoje.getDate() + diferenca)
        //Define Sexta Feira apartir da diferença entre Segunda e Ela
        const sexta = new Date(segunda)
        sexta.setDate(segunda.getDate() + 4)
        sexta.setHours(23,59,59,999)

        const refeicoes = await prisma.cardapios.findMany({
            where: {
                data_ref:{
                    gte:segunda,
                    lte:sexta
                }
            }
        })

        return console.log(refeicoes)
        
    }catch(error){
        console.log(error)
        return ;
    }
}

CardapioSemana()