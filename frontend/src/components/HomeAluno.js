import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
export default function HomeAluno({ navigation }) {
  const {usuario} = useContext(AuthContext)
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.greeting}>OLÁ {usuario.nome}!</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>REFEIÇÃO NÃO AGENDADA</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AgenAluno')}>
          <Text style={styles.primaryButtonText}>AGENDAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('CalenAluno')}>
          <Text style={styles.secondaryButtonText}>VER CALENDÁRIO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('HistAluno')}>
          <Text style={styles.secondaryButtonText}>VER HISTÓRICO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '88%', backgroundColor: '#FFFFFF', borderRadius: 16,
    paddingVertical: 60, paddingHorizontal: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  greeting: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 32, letterSpacing: 0.5 },
  statusBox: {
    borderWidth: 1.5, borderColor: '#E0393E', borderRadius: 24,
    paddingVertical: 12, paddingHorizontal: 20, marginBottom: 40,
  },
  statusText: { color: '#E0393E', fontWeight: '700', fontSize: 13, letterSpacing: 0.3 },
  primaryButton: { backgroundColor: '#1565D8', width: '100%', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, letterSpacing: 0.5 },
  secondaryButton: { backgroundColor: '#1565D8', opacity: 0.85, width: '100%', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  secondaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, letterSpacing: 0.5 },
});
