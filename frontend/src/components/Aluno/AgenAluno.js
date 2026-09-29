import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

export default function AgenAluno({ navigation }) {

  const { usuario, token } = useContext(AuthContext);

  const [ref, setRef] = useState(null);

  async function getRef() {
    try {
      const response = await fetch(
        "http://192.168.0.246:3000/cardapio/hoje",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message);
        return;
      }

      setRef(data);

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível conectar com o servidor."
      );
    }
  }

  useEffect(() => {
    getRef();
  }, []);

  return (
    <View style={styles.screen}>

      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>
          {ref?.data_ref
            ? new Date(ref.data_ref).toLocaleDateString('pt-BR')
            : 'Carregando...'}
        </Text>
      </View>

      <View style={styles.content}>

        <Text style={styles.sectionTitle}>
          ALMOÇO DE HOJE
        </Text>

        {ref ? (
          <View style={styles.itemRow}>

            <Text style={styles.itemText}>
              {ref.nome_ref}
            </Text>

            <Text style={styles.itemText}>
              {ref.descricao_ref}
            </Text>

          </View>
        ) : (
          <Text style={styles.itemText}>
            Carregando refeição...
          </Text>
        )}

      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.confirmButtonText}>
          + AGENDAR REFEIÇÃO
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>
          CANCELAR
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16
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
    fontWeight: '700',
    fontSize: 15
  },

  content: {
    backgroundColor: '#E9E9E9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 16,
    marginBottom: 24
  },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1A1A1A',
    marginBottom: 12
  },

  itemRow: {
    marginBottom: 10
  },

  itemText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 5
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
    fontWeight: '700',
    fontSize: 14
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
    fontWeight: '600',
    fontSize: 12
  }
});