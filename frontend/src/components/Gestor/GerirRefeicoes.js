import React, { useContext, useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

export default function GerirRefeicoes({ navigation }) {
    const { token } = useContext(AuthContext);
    const [refeicoes, setRefeicoes] = useState([]);

    const diasSemana = [
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira'
    ];

    async function getRefeicoes() {
        try {
            const response = await fetch(
                'http://192.168.0.246:3000/cardapio/semana',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                Alert.alert(
                    'Erro',
                    data.message || 'Erro ao buscar cardápios.'
                );
                return;
            }

            setRefeicoes(data.refeicoes || []);

        } catch (error) {
            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível conectar com o servidor.'
            );
        }
    }

    useEffect(() => {
        getRefeicoes();
    }, []);

    const refeicoesSemana = diasSemana.map((dia, index) => {
        const refeicao = refeicoes.find(Item => {
            if (!Item || !Item.data_ref) {
                return false;
            }

            const data = new Date(Item.data_ref);

            // Corrige o fuso horário do Brasil (UTC-3)
            data.setHours(data.getHours() + 3);

            return data.getDay() === index;
        });

        return {
            dia,
            refeicao
        };
    });

    console.log('Refeições:', refeicoes);

    return (
        <View style={styles.tela}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.selecioneRef}>
                    SELECIONE A REFEIÇÃO:
                </Text>

                <View style={styles.listaRefeicoes}>

                    {refeicoesSemana.map((Item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.cartao}
                            onPress={() => {

                                if (Item.refeicao) {

                                    navigation.navigate(
                                        'EditarRefeicao',
                                        {
                                            refeicao: Item.refeicao
                                        }
                                    );

                                } else {
                                    const hoje = new Date();
                                    const diaAtual = hoje.getDay();
                                    const diferenca =
                                        index - diaAtual + 1;
                                    const data = new Date(hoje);
                                    data.setDate(
                                        hoje.getDate() + diferenca
                                    );

                                    const dataFormatada =
                                        data.toISOString();

                                    navigation.navigate(
                                        'CriarRefeicao',
                                        {
                                            dia: Item.dia,
                                            data: dataFormatada
                                        }
                                    );
                                }
                            }}
                        >

                            <View style={styles.topoCartao}>
                                <Text style={styles.textoCartao}>
                                    {Item.dia}
                                </Text>
                            </View>

                            <View style={styles.corpoCartao}>
                                <Text style={styles.textoCartao}>
                                    {Item.refeicao
                                        ? Item.refeicao.descricao_ref
                                        : 'Preciso adicionar informações'}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    ))}

                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },

    container: {
        paddingBottom: 20
    },

    selecioneRef: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15
    },

    listaRefeicoes: {
        paddingHorizontal: 20
    },

    cartao: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15
    },

    topoCartao: {
        backgroundColor: '#00D82F',
        padding: 12
    },

    corpoCartao: {
        backgroundColor: '#D9D9D9',
        padding: 15
    },

    textoCartao: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 24
    }
});
