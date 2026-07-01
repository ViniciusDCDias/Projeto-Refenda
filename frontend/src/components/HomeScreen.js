import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
// or any files within the Snack
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

export default function HomeScreen({navigation}) {
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

  if (!fontsLoaded) {
    return null; // Ou um componente de loading
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo ao Refenda!</Text>
      <Text style={styles.subtitle}>Qual seu tipo de Usuario?</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LoginAluno')}>
          <Icon name="account-school" size={80} color="#1976d2" />
          <Text style={styles.cardText}>Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LoginCozi')}>
          <Icon name="chef-hat" size={80} color="#1976d2" />
          <Text style={styles.cardText}>Gestão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LoginFunc')}>
          <Icon name="account-hard-hat" size={80} color="#1976d2" />
          <Text style={styles.cardText}>Funcionarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    color: '#1976d2',
    fontWeight: '600',
    fontFamily: 'ZenDots_400Regular',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});
