import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, TextInput} from 'react-native';

export default function CriarCardapio({navigation}) {
    const [descricao, setDescricao] = useState('');
    return (
        <SafeAreaView style = {styles.tela}>
                <View style = {styles.diaSemana}>
                    <Text style = {styles.textDiaSemana}>SEGUNDA -FEIRA: 16 DE MARÇO</Text>
                </View>
                <View style = {styles.containerEdicao}>
                    <TextInput 
                        style={styles.caixaTexto} 
                        value={descricao}
                        onChangeText={setDescricao}
                        placeholder="Arroz, Feijão, Frango Assado, ..."
                        multiline
                    />
                    <TouchableOpacity style={styles.botaoEnviar}  onPress={() => console.log(descricao)}>
                        <Text style={styles.textoBotao}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tela:{ 
        flex: 1, 
        backgroundColor: '#F2F2F2' 
    },

    textoCriarRef:{ 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#000'
    },

    diaSemana:{
        backgroundColor: '#00D82F', 
        padding:12, 
        borderRadius: 12,
        overflow: 'hidden', 
        marginBottom: 15, 
        alignItems: 'center', 
        marginHorizontal: 20
    },

    textDiaSemana:{
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#000', 
        textAlign: 'center'
    },

    containerEdicao:{
        backgroundColor: '#D9D9D9', 
        borderRadius: 12, 
        padding: 20, 
        marginHorizontal: 20,
         alignItems: 'center',
         marginBottom:20
        },

    caixaTexto:{
        backgroundColor: '#F5F5F5', 
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 10,
        padding: 12, 
        minHeight: 180, 
        textAlignVertical: 'top', 
        width: '100%',
        flexShrink: 1
    },

    botaoEnviar:{
        backgroundColor: '#00D82F', 
        padding:12, 
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15, 
        alignItems: 'center', 
        marginTop: 20,
        width:'100%'
    },

    textoBotao:{
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#000'
    },
});