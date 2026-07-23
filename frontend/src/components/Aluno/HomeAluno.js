import React, {useContext,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { AuthContext } from '../../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

export default function HomeAluno({ navigation }) {
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.greeting}>OLÁ {nome.toUpperCase()}!</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>REFEIÇÃO NÃO AGENDADA</Text>
        </View>

        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Agendar')}>
          <Text style={styles.ButtonText}>AGENDAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('CalenAluno')}>
          <Text style={styles.ButtonText}>VER CALENDÁRIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Historico')}>
          <Text style={styles.ButtonText}>VER HISTÓRICO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#F2F2F2', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  card: {
    width: '88%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16,
    paddingVertical: 60, 
    paddingHorizontal: 24, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 3,
  },
  greeting: { 
    fontSize: 18, 
    color: '#1A1A1A', 
    marginBottom: 32, 
    letterSpacing: 0.5,
    fontFamily:'ZenDots_400Regular' 
  },

  statusBox: {
    borderWidth: 1.5, 
    borderColor: '#E0393E', 
    borderRadius: 24,
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    marginBottom: 40,
  },

  statusText: { 
    color: '#E0393E', 
    fontWeight: '700', 
    fontSize: 13, 
    letterSpacing: 0.3,
    fontFamily:'Inter_400Regular' 
  },

  Button: { 
    backgroundColor: '#1565D8', 
    width: '100%', 
    paddingVertical: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  ButtonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    letterSpacing: 0.5 ,
    fontFamily:'Inter_400Regular'
  },
});
