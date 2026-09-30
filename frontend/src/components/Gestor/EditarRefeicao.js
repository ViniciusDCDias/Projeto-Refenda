import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

export default function EditarCardapio({ navigation, route }) {

    const { token } = useContext(AuthContext);

    const { refeicao } = route.params;

    const [cardapio, setCardapio] = useState(
        refeicao?.descricao_ref || ''
    );

    async function editarCardapio() {

        try {

            const response = await fetch(
                `http://192.168.0.246:3000/cardapio/${refeicao.data_ref}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        descricao_ref: cardapio
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                Alert.alert(
                    'Erro',
                    data.message || 'Não foi possível editar o cardápio.'
                );
                return;
            }

            Alert.alert(
                'Sucesso',
                'Cardápio alterado com sucesso!'
            );

            navigation.goBack();

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível conectar com o servidor.'
            );
        }
    }

    return (

        <View style={styles.tela}>

            <View style={styles.diaSemana}>
                <Text style={styles.textDiaSemana}>
                    {refeicao?.data_ref}
                </Text>
            </View>

            <View style={styles.containerEdicao}>

                <TextInput
                    style={styles.caixaTexto}
                    value={cardapio}
                    onChangeText={setCardapio}
                    placeholder="Digite o cardápio do dia..."
                    multiline
                />

                <TouchableOpacity
                    style={styles.botaoEnviar}
                    onPress={editarCardapio}
                >
                    <Text style={styles.textoBotao}>
                        ENVIAR
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    tela: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },

    diaSemana: {
        backgroundColor: '#00D82F',
        padding: 12,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
        alignItems: 'center',
        marginHorizontal: 20
    },

    textDiaSemana: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },

    containerEdicao: {
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20
    },

    caixaTexto: {
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

    botaoEnviar: {
        backgroundColor: '#00D82F',
        padding: 12,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },

    textoBotao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },

});