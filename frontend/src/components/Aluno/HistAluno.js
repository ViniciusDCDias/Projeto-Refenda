import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const historico = [
  { data: '23/05', status: 'AGENDADO' },
  { data: '24/05', status: 'AGENDADO' },
  { data: '25/05', status: 'AGENDADO' },
  { data: '26/05', status: 'NÃO AGENDADO' },
];

export default function HistAluno({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>

      <View style={styles.titleButton}>
        <Text style={styles.titleButtonText}>HISTÓRICO</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {historico.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.rowDate}>{item.data}</Text>
            <Text style={[styles.rowStatus, item.status === 'AGENDADO' ? styles.statusOk : styles.statusNok]}>
              {item.status}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: '#E9E9E9', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  backText: { fontSize: 20, color: '#1A1A1A' },
  headerTitle: { fontWeight: '700', fontSize: 14, textAlign: 'center', color: '#1A1A1A' },
  titleButton: { backgroundColor: '#2ECC40', marginHorizontal: 20, marginTop: 20, marginBottom: 16, paddingVertical: 16, borderRadius: 10, alignItems: 'center' },
  titleButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  list: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F2F2F2', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 10 },
  rowDate: { fontSize: 13, color: '#1A1A1A', fontWeight: '600' },
  rowStatus: { fontSize: 12, fontWeight: '700' },
  statusOk: { color: '#2ECC40' },
  statusNok: { color: '#E0393E' },
});
