import React, {useContext} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function HomeGestor ({navigation}) {
   const {usuario} = useContext(AuthContext)
  const nome = usuario.nome

    return (
        <SafeAreaView style={styles.tela}>
            <View style={styles.card}>
                <View style={styles.saudacao}>
                    <Text style = {styles.textoSaudacao}>OLÁ {nome.toUpperCase()}!</Text>
                </View>

                <View style={styles.containerBotoes}>
                    <TouchableOpacity style = {styles.botao} onPress = {() => navigation.navigate('EditarRefeicoes') }>  
                        <Text style = {styles.textoBotao}>EDITAR REFEIÇÕES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.botao} onPress = {() => navigation.navigate('ConsultarAgendamentos')}>
                        <Text style = {styles.textoBotao}>CONSULTAR AGENDAMENTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.botao} onPress = {() => navigation.navigate('DadosConsumo')}>
                        <Text  style = {styles.textoBotao}>VER DADOS DE CONSUMO</Text>  
                    </TouchableOpacity>
                    
                    
                </View>    
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    tela:{ flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
    card: {
        width: '88%', backgroundColor: '#FFFFFF', borderRadius: 16,
        paddingVertical: 60, paddingHorizontal: 24, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
    },
    saudacao:{width: '88%' , marginBottom: 50, marginTop: 80, alignItems: 'center'},

    textoSaudacao:{fontSize: 30, color: '#000000', fontWeight: 'bold', textAlign: 'center'},

    containerBotoes:{width: '88%', alignItems: 'center', justifyContent: 'center', marginTop: 25},

    botao:{backgroundColor: '#1976D2', marginBottom: 15, borderRadius: 10,
     width: '100%', height: 55, justifyContent: 'center', alignItems:'center' },

    textoBotao:{color: '#F2F2F2', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}

});