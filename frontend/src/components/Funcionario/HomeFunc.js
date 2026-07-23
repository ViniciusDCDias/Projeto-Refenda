import React,{useContext,useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { AuthContext } from '../../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

export default function HomeFunc({ navigation }) {
  const {usuario} = useContext(AuthContext)
  const nome = usuario.nome
  let [fontsLoaded] = useFonts({
      ZenDots_400Regular,
      Inter_400Regular,
  });
      useEffect(() => {
      if (fontsLoaded) {
      // Esconde a splash screen quando a fonte carregar
      SplashScreen.hideAsync();
      }
  }, [fontsLoaded]);
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
    marginBottom: 50,
    fontFamily:'ZenDots_400Regular'
  },

  aviso: {
    width: 300,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginBottom: 50,
  },

  textoaviso: {
    color: 'red',
    fontSize: 20,
    fontFamily:'Inter_400Regular'
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
    fontFamily:'Inter_400Regular'
  },
});
