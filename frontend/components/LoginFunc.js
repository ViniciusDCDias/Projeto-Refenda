import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

export default function LoginAluno(){
  let [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Inter_400Regular,
  });
    useEffect(() => {
    if (fontsLoaded) {
      // Esconde a splash screen quando a fonte carregar
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const [email,setemail] = useState('')
  const [senha,setSenha] = useState('')

  const login = async () => {
      try {
        const response = await fetch("http://192.168.0.10:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            identificador: email,
            senha: senha
          })
        });
        const data = await response.json();
        if (!response.ok) {
          Alert.alert("Erro", data.message);
          return;
        }
        console.log(data);
        Alert.alert(
          "Sucesso",
          `Bem-vindo ${data.user.nome}`
        );
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Erro",
          "Não foi possível conectar ao servidor."
        );
      }
    }
    const EntradaValida = () => {
      if (email === "" || senha === "") {
        Alert.alert(
          "Erro",
          "Os campos RA e Senha devem ser preenchidos!"
        );
        return
      }
      login();
    }
  return(
    <View style={styles.container}>
      <View style={styles.containerS}>
        <Text style={styles.title}>Faça seu login como funcionario:</Text>
      </View>  
      <Text>Email:</Text>
      <TextInput 
      style={styles.input}
      placeholder="Digite seu email"
      value={email}
      onChangeText={setemail}
      />
      <Text>Senha:</Text>
      <TextInput 
      style={styles.input}
      placeholder="Digite sua senha"
      value={senha}
      onChangeText={setSenha}
      />
      <View style={styles.containerS}>
        <TouchableOpacity
          style={styles.button}
          onPress={EntradaValida}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    fontFamily:Inter_400Regular
  },
  containerS:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:0,
    margin:0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily:ZenDots_400Regular

  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:50,
  },
  button:{
    width:53,
    height:30,
    backgroundColor:"#1976d2",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  buttonText:{
    color:"#fff"
  }
})