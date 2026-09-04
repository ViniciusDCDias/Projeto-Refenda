        const dataHoje = new Date()
        console.log(dataHoje.toLocaleDateString('pt-br'))
        const diaHoje = dataHoje.getDay()
        if(diaHoje == 0){
            console.log("Hoje é Domingo")
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