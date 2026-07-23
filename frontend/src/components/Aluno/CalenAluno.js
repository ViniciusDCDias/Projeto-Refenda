import React, {useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

const semana = [
  { dia: 'SEGUNDA-FEIRA: 16 DE MARÇO', cardapio: 'Frango grelhado, Arroz ,Feijão, Salada de alface e tomate, Maçã' },
  { dia: 'TERÇA-FEIRA: 16 DE MARÇO', cardapio: 'Macarrão ao molho de carne moída, Salada de cenoura ralada, Banana' },
  { dia: 'QUARTA-FEIRA: 16 DE MARÇO', cardapio: 'Peixe assado, Arroz, Feijão, Purê de batata, Laranja' },
  { dia: 'QUINTA-FEIRA: 16 DE MARÇO', cardapio: 'Carne moída refogada, Arroz, Feijão, Salada de repolho, Melancia' },
  { dia: 'SEXTA-FEIRA: 16 DE MARÇO', cardapio: 'Frango ensopado, Arroz, Feijão, Legumes cozidos (cenoura e batata), Abacaxi' },
];

export default function CalenAluno({ navigation }) {
  let [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Calendario da Semana: </Text>
      <View style={styles.frame}>
        <View style={styles.semana}>
            {semana.map((item, index) => (
              <View key={index} style={styles.dayBlock}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayHeaderText}>{item.dia}</Text>
                </View>
                <View style={styles.dayContent}>
                  <Text style={styles.dayContentText}>{item.cardapio}</Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, 
    paddingTop: 16 ,
    alignContent:'center',
    justifyContent:'center'
  },
  title: { 
    color: '#000000', 
    fontSize: 25,
    fontFamily:'Inter_400Regular',
    alignSelf:'center',
    marginBottom:30,
  },
  frame: { 
    flex: 1, 
    borderWidth: 2, 
    borderColor: '#1A1A1A', 
    borderRadius: 20, 
    padding: 20,
    maxHeight:600,
    alignContent:'center',
    justifyContent:'center'
  },
  semana: {
    flex:1,
    alignContent:'center',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:"center"
  },
  dayBlock: { 
    marginBottom: 10,
  },
  dayHeader: { 
    backgroundColor: '#2ECC40', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8 
  },
  dayHeaderText: { 
    color: '#FFFFFF', 
    fontSize: 15 ,
    fontFamily:'Inter_400Regular'
  },
  dayContent: { 
    backgroundColor: '#F2F2F2', 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8 
  },
  dayContentText: { 
    fontSize: 15, 
    color: '#1A1A1A',  
    lineHeight: 17 ,
    fontFamily:'Inter_400Regular'
  },
});
