import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

const API_URL = 'http://192.168.0.242:3000';

export default function HistAluno({ navigation }) {

  const { token } = useContext(AuthContext);

  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarHistorico() {
    try {
      const response = await fetch(`${API_URL}/relatorio/mes/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Erro',
          data.message || 'Não foi possível buscar o histórico.'
        );
        return;
      }

      const lista = Array.isArray(data)
        ? data
        : data.agendamentos || data.historico || [];

      setHistorico(lista);

    } catch (error) {
      console.log('Erro ao buscar histórico:', error);

      Alert.alert(
        'Erro',
        'Não foi possível conectar com o servidor.'
      );

    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (token) {
      buscarHistorico();
    } else {
      setCarregando(false);
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.screen}>

      <View style={styles.titleButton}>
        <Text style={styles.titleButtonText}>
          HISTÓRICO
        </Text>
      </View>

      {carregando ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2ECC40" />
          <Text style={styles.emptyText}>
            Carregando histórico...
          </Text>
        </View>
      ) : (

        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
        >

          {historico.length > 0 ? (

            historico.map((item, index) => {

              const data = item.cardapios?.data_ref || item.data_ref || item.data_agen;

              const nome = item.cardapios?.nome_ref || item.nome_ref || 'Refeição';

              const status = item.atividade_agen
                ? 'AGENDADO'
                : 'CANCELADO';

              return (
                <View key={`${item.id_ref || index}`} style={styles.row}>

                  <View style={styles.info}>
                    <Text style={styles.rowDate}>
                      {data
                        ? new Date(data).toLocaleDateString('pt-BR', {
                            timeZone: 'UTC'
                          })
                        : 'Data indisponível'}
                    </Text>

                    <Text style={styles.rowMeal}>
                      {nome}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.rowStatus,
                      item.atividade_agen
                        ? styles.statusOk
                        : styles.statusNok
                    ]}
                  >
                    {status}
                  </Text>

                </View>
              );
            })

          ) : (

            <Text style={styles.emptyText}>
              Nenhum agendamento encontrado.
            </Text>

          )}

        </ScrollView>
      )}

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
    fontWeight: '700',
    fontSize: 15
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

  info: {
    flex: 1,
    marginRight: 10
  },

  rowDate: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
    marginBottom: 5
  },

  rowMeal: {
    fontSize: 12,
    color: '#666666'
  },

  rowStatus: {
    fontSize: 12,
    fontWeight: '700'
  },

  statusOk: {
    color: '#2ECC40'
  },

  statusNok: {
    color: '#E0393E'
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 25,
    fontSize: 14
  }

});