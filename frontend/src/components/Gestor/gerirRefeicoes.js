import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

export default function GerirRefeicoes({ navigation }) {
  return (
    <SafeAreaView style = {styles.tela}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style = {styles.selecioneRef}>SELECIONE A REFEIÇÃO:</Text>
            <View style={styles.listaRefeicoes}>
               <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('editarRefeicao')}>
                    <View style={styles.topoCartao}>
                        <Text style={styles.textoCartao}>SEGUNDA -FEIRA: 16 DE MARÇO</Text>
                    </View>
                    <View style={styles.corpoCartao}>
                        <Text style={styles.textoCartao}>
                            Frango grelhado, Arroz, Feijão,{"\n"}
                            Salada de alface e tomate,{"\n"}
                            Maçã
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('EditarCardapio')}>
                    <View style={styles.topoCartao}>
                        <Text style={styles.textoCartao}>TERÇA -FEIRA: 17 DE MARÇO</Text>
                    </View>
                    <View style={styles.corpoCartao}>
                        <Text style={styles.textoCartao}>
                            Macarrão ao molho de carne{"\n"}
                            moída, Salada de cenoura{"\n"}
                            ralada, Banana
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('EditarCardapio')}>
                    <View style={styles.topoCartao}>
                        <Text style={styles.textoCartao}>QUARTA -FEIRA: 18 DE MARÇO</Text>
                    </View>
                    <View style={styles.corpoCartao}>
                        <Text style={styles.textoCartao}>
                           Peixe assado, Arroz, Feijão, Purê{"\n"}
                           de batata, Laranja{"\n"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('EditarCardapio')}>
                    <View style={styles.topoCartao}>
                        <Text style={styles.textoCartao}>QUINTA -FEIRA: 19 DE MARÇO</Text>
                    </View>
                    <View style={styles.corpoCartao}>
                        <Text style={styles.textoCartao}>
                           Carne moída refogada, Arroz,{"\n"}
                           Feijão, Salada de repolho,{"\n"}
                           Melancia 
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('EditarCardapio')}>
                    <View style={styles.topoCartao}>
                        <Text style={styles.textoCartao}>SEXTA -FEIRA: 20 DE MARÇO</Text>
                    </View>
                    <View style={styles.corpoCartao}>
                        <Text style={styles.textoCartao}>
                           Frango ensopado, Arroz, Feijão,{"\n"}
                           Legumes cozidos(cenoura e{"\n"}
                           batata), Abacaxi 
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    tela:{ 
        flex: 1, 
        backgroundColor: '#F2F2F2',
        fontFamily:'Inter_400Regular'
    } ,
    voltar:{ 
        marginRight: 15
    },
    textoEditRef:{ 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#000',
        fontFamily:'Inter_400Regular'
    },
    container:{
        paddingBottom:20
    },
    selecioneRef:{
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 15,
        fontFamily:'ZenDots_400Regular'
    },
    listaRefeicoes:{
        paddingHorizontal: 20
    },
    cartao:{
        backgroundColor: '#FFFFFF', 
        borderRadius: 12,
        overflow: 'hidden', 
        marginBottom: 15
    }, 
    topoCartao:{
        backgroundColor: '#00D82F', 
        padding:12
    },
    corpoCartao:{
        backgroundColor: '#D9D9D9', 
        padding:15
    },
    textoCartao:{
        fontSize: 16, 
        color: '#333333', 
        lineHeight: 24,
        fontFamily:'Inter_400Regular'
    }
});