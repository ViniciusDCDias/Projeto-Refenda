import React, {useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

const historico = [
  { data: '23/05', status: 'AGENDADO' },
  { data: '24/05', status: 'AGENDADO' },
  { data: '25/05', status: 'AGENDADO' },
  { data: '26/05', status: 'NÃO AGENDADO' },
];

export default function HistAluno({ navigation }) {
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
  screen: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  titleButton: { 
    backgroundColor: '#2ECC40', 
    marginHorizontal: 20, 
    marginTop: 20, 
    marginBottom: 16, 
    paddingVertical: 16, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  titleButtonText: { 
    color: '#FFFFFF', 
    fontSize: 20,
    fontFamily:'ZenDots_400Regular' 
  },
  list: { 
    paddingHorizontal: 20 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#F2F2F2', 
    borderRadius: 8, 
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    marginBottom: 10 
  },
  rowDate: { 
    fontSize: 15, 
    color: '#1A1A1A',
    fontFamily:'Inter_400Regular'
  },
  rowStatus: { 
    fontSize: 15, 
    fontFamily:'Inter_400Regular'
  },
  statusOk: { 
    color: '#2ECC40' 
  },
  statusNok: { 
    color: '#E0393E' 
  },
});
