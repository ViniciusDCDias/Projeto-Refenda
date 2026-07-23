import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

const almocoDeHoje = {
  dia: 'TERÇA - 17 DE MARÇO',
  itens: [
    { emoji: '🍗', nome: 'Frango grelhado' },
    { emoji: '🍚', nome: 'Arroz' },
    { emoji: '🫘', nome: 'Feijão' },
    { emoji: '', nome: 'Salada de alface e tomate' },
    { emoji: '', nome: 'Melancia' },
  ],
};

export default function AgenAluno({ navigation }) {
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

      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{almocoDeHoje.dia}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>ALMOÇO DE HOJE</Text>
        {almocoDeHoje.itens.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            {item.emoji ? <Text style={styles.itemEmoji}>{item.emoji}</Text> : null}
            <Text style={styles.itemText}>{item.nome}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
        <Text style={styles.confirmButtonText}>+  AGENDAR REFEIÇÃO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>CANCELAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 20, 
    paddingTop: 16 ,
    justifyContent:'center'
  },
  dayHeader: { 
    backgroundColor: '#2ECC40', 
    borderRadius: 10, 
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    marginBottom: 2 
  },
  dayHeaderText: { 
    color: '#FFFFFF', 
    fontSize: 23,
    fontFamily:'ZenDots_400Regular' 
  },
  content: { 
    backgroundColor: '#E9E9E9', 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    padding: 16, 
    marginBottom: 24 
  },
  sectionTitle: { 
    fontSize: 20, 
    color: '#1A1A1A', 
    marginBottom: 12,
    fontFamily:'Inter_400Regular'
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  itemEmoji: { 
    fontSize: 16, marginRight: 8 
  },
  itemText: { 
    fontSize: 18, 
    color: '#1A1A1A',
    fontFamily:'Inter_400Regular' 
  },
  confirmButton: { 
    backgroundColor: '#2ECC40', 
    paddingVertical: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  confirmButtonText: { 
    color: '#FFFFFF',  
    fontSize: 18,
    fontFamily:'Inter_400Regular'
  },
  cancelButton: { 
    alignSelf: 'center', 
    borderWidth: 1, 
    borderColor: '#D0D0D0', 
    borderRadius: 16, 
    paddingVertical: 6, 
    paddingHorizontal: 20
  },
  cancelButtonText: { 
    color: '#9A9A9A', 
    fontSize: 15,
    fontFamily:'Inter_400Regular'
  },
});
