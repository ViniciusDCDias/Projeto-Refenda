import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../context/AuthContext';

export default function LoginAluno({navigation}) {

  const { login } = useContext(AuthContext)

  let [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [ra, setRa] = useState("");
  const [senha, setSenha] = useState("");

  const validacao = async () => {

    try {

      const response = await fetch("http://192.168.0.230:3000/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          identificador: ra,
          senha: senha
        })

      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message);
        return;
      }

      const tipo = data.user.tipo
      if(tipo === "ALUNO"){

        login(data.token,data.user)
        navigation.replace("HomeAluno")
        
      }else{
        Alert.alert("Erro","Tente novamente, você pode estar tentando logar com a o tipo errado...")
        navigation.replace("Home")
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );

    }

  }

  const EntradaValida = () => {

    const isValid = /^\d+$/.test(ra);

    if (ra === "" || senha === "") {

      Alert.alert(
        "Erro",
        "Os campos RA e Senha devem ser preenchidos!"
      );

      return;

    }

    if (!isValid) {

      Alert.alert(
        "Erro",
        "O RA deve conter apenas números."
      );

      return;

    }

    validacao();

  }

  return (

    <View style={styles.container}>

      <View style={styles.containerS}>
        <Text style={styles.title}>
          Faça seu login como Aluno:
        </Text>
      </View>

      <Text>Registro do Aluno:</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu RA"
        value={ra}
        onChangeText={setRa}
        keyboardType="numeric"
      />

      <Text>Senha:</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.containerS}>

        <TouchableOpacity
          style={styles.button}
          onPress={EntradaValida}
        >

          <Text style={styles.buttonText}>
            Entrar
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    fontFamily: Inter_400Regular
  },

  containerS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: ZenDots_400Regular
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
  },

  button: {
    width: 60,
    height: 35,
    backgroundColor: "#1976d2",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: "#fff"
  }

});