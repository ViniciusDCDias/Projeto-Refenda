import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeFunc({ navigation }) {
  const nome = "Miguel";

  return (
    <SafeAreaView style={styles.tela}>

      <Text style={styles.ola}>OLÁ {nome}!</Text>

      <View style={styles.aviso}>
        <Text style={styles.textoaviso}>
          REFEIÇÃO NÃO AGENDADA
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Agendar')}
      >
        <Text style={styles.textoBotao}>AGENDAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Historico')}
      >
        <Text style={styles.textoBotao}>HISTÓRICO</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ola: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
  },

  aviso: {
    width: 300,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginBottom: 50,
  },

  textoaviso: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#1E88E5',
    width: 260,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
  },

  textoBotao: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
