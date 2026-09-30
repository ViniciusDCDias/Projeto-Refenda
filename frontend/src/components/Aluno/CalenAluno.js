import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import { AuthContext } from '../../context/AuthContext';

export default function CalenAluno({ navigation }) {

  const { token } = useContext(AuthContext);

  const [refeicoes, setRefeicoes] = useState([]);

  const diasSemana = [
    'SEGUNDA-FEIRA',
    'TERÇA-FEIRA',
    'QUARTA-FEIRA',
    'QUINTA-FEIRA',
    'SEXTA-FEIRA'
  ];

  async function getRef() {
    try {

      const response = await fetch(
        "http://192.168.0.246:3000/cardapio/semana",
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

      // Se a API retornar undefined ou null,
      // usamos um array vazio.
      if (Array.isArray(data)) {
        setRefeicoes(data);
      } else {
        setRefeicoes([]);
      }

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

  const semana = diasSemana.map((dia, index) => {

    const refeicao = refeicoes.find(Item => {

      const data = new Date(Item.data_ref);

      return data.getDay() === index + 1;

    });

    return {
      dia,
      refeicao
    };
  });

  return (
    <View style={styles.screen}>

      <View style={styles.frame}>

        <ScrollView showsVerticalScrollIndicator={false}>

          {semana.map((item, index) => (

            <View
              key={index}
              style={styles.dayBlock}
            >

              <View style={styles.dayHeader}>

                <Text style={styles.dayHeaderText}>
                  {item.dia}

                  {item.refeicao &&
                    `: ${new Date(
                      item.refeicao.data_ref
                    ).toLocaleDateString('pt-BR')}`
                  }

                </Text>

              </View>

              <View style={styles.dayContent}>

                <Text style={styles.dayContentText}>

                  {item.refeicao
                    ? item.refeicao.descricao_ref
                    : 'Preciso adicionar informações'
                  }

                </Text>

              </View>

            </View>

          ))}

        </ScrollView>

      </View>

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

  frame: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 20,
    padding: 12
  },

  dayBlock: {
    marginBottom: 10
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
    fontWeight: '700',
    fontSize: 11
  },

  dayContent: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },

  dayContentText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '600',
    lineHeight: 17
  }

});