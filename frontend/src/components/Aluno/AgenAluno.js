import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
//Retirar Quando Estiver Pronta a Rota !
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
  screen: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 16 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 20, color: '#1A1A1A' },
  dayHeader: { backgroundColor: '#2ECC40', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 2 },
  dayHeaderText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  content: { backgroundColor: '#E9E9E9', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 16, marginBottom: 24 },
  sectionTitle: { fontWeight: '700', fontSize: 13, color: '#1A1A1A', marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  itemEmoji: { fontSize: 16, marginRight: 8 },
  itemText: { fontSize: 14, color: '#1A1A1A' },
  confirmButton: { backgroundColor: '#2ECC40', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  confirmButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  cancelButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 20 },
  cancelButtonText: { color: '#9A9A9A', fontWeight: '600', fontSize: 12 },
});
