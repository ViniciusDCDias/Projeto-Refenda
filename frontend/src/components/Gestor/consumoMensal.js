import react from 'react';
import { Text, View, SafeAreaView, StyleSheet} from 'react-native';

export default function DadosConsumo ({navigation}){
    return(
        <SafeAreaView style = {styles.tela}>
            <View style = {styles.card1}>
                <Text style = {styles.titulo}>CONSUMO:</Text>
            </View>
            
            <View style = {styles.card2}>
                    <Text style = {styles.texto}>
                        De X refeições agendadas nos ultimos 30 dias,
                        cerca de Y refeições não foram consumidas, ou seja, 
                        houve desperdicio de Nkg de comida nos ultimos 30 dias
                    </Text>
                </View>

        </SafeAreaView>
    );
}  

const styles = StyleSheet.create({  
    
    tela:{flex: 1, backgroundColor: '#F2F2F2' },

    card1:{backgroundColor: '#00D82F', borderRadius: 12, alignItems: 'center'},

    titulo:{color: '', textAlign: 'center', fontSize: 30, fontWeight: 'bold'},

    card2:{backgroundColor: '#D9D9D9', borderRadius: 12, alignItems: 'center'},

    texto:{color:'#000',textAlign: 'center', fontSize: 32, fontWeight:'light'}, 
});