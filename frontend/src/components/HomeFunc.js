import React,{useContext} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeFunc({ navigation }) {
  const {usuario} = useContext(AuthContext)
  const nome = usuario.nome
  return (
    <SafeAreaView style={styles.tela}>
      <View style={styles.card}>
        <Text style={styles.ola}>OLÁ {nome.toUpperCase()}!</Text>

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
      </View>
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

  card: {
    width: '88%', backgroundColor: '#FFFFFF', borderRadius: 16,
    paddingVertical: 60, paddingHorizontal: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
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
