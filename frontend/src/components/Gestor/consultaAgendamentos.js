import react from 'react';
import { Text, View, SafeAreaView, StyleSheet} from 'react-native';

export default function ConsultarAgendamentos  ({navigation}) {
    return(
        <SafeAreaView style = {styles.tela}>
            <View style = {styles.card}>
                <Text style = {styles.titulo}>REFEIÇÕES AGENDADAS HOJE:</Text>

                <Text style = {styles.texto}>360 REFEIÇÕES FORAM AGENDADAS HOJE</Text>
            </View>

            <View style = {styles.card}>
                <Text style = {styles.titulo}>SITUAÇÃO DO AGENDAMENTO:</Text>

                <Text style = {styles.texto}>A SITUAÇÃO DE AGENDAMENTO É DE: Terminada</Text>

            </View>
        
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    tela:{flex: 1, backgroundColor: '#F2F2F2' },

    card:{backgroundColor: '#D9D9D9',alignItems: 'center', borderRadius: 12 },

    titulo:{color: '#1976D2', textAlign: 'center', fontSize: 22, fontWeight: 'bold'},

    texto:{color:'#000',textAlign: 'center', fontSize: 32, fontWeight:'bold'}

});