import React from 'react';
import { View, Text } from 'react-native';

export default function CalendarioScreen() {
  return (
    <View>
      <Text>Em desenvolvimento</Text>
    </View>
  );
}


/*
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// ex:
const semana = [
  {
    dia: 'SEGUNDA-FEIRA: 16 DE MARÇO',
    cardapio: 'Frango grelhado, Arroz ,Feijão, Salada de alface e tomate, Maçã',
  },
  {
    dia: 'TERÇA-FEIRA: 16 DE MARÇO',
    cardapio: 'Macarrão ao molho de carne moída, Salada de cenoura ralada, Banana',
  },
  {
    dia: 'QUARTA-FEIRA: 16 DE MARÇO',
    cardapio: 'Peixe assado, Arroz, Feijão, Purê de batata, Laranja',
  },
  {
    dia: 'QUINTA-FEIRA: 16 DE MARÇO',
    cardapio: 'Carne moída refogada, Arroz, Feijão, Salada de repolho, Melancia',
  },
  {
    dia: 'SEXTA-FEIRA: 16 DE MARÇO',
    cardapio: 'Frango ensopado, Arroz, Feijão, Legumes cozidos (cenoura e batata), Abacaxi',
  },
];

export default function CalendarioScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <View style={styles.frame}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 20,
    color: '#1A1A1A',
  },
  frame: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 20,
    padding: 12,
  },
  dayBlock: {
    marginBottom: 10,
  },
  dayHeader: {
    backgroundColor: '#2ECC40',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dayHeaderText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  dayContent: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dayContentText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '600',
    lineHeight: 17,
  },
});*/