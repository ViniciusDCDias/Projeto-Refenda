import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function RedefinirSenha({ navigation }) {
  const SENHA_MIN = 6
  const [novaSenha, setNovaSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const {usuario, token} = useContext(AuthContext)
  const email = usuario.email
  const tipo = usuario.tipo
  async function redefineSenha(){
    try{
        const response = await fetch(`http://192.168.0.242:3000/users/${email}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                newSenha:novaSenha
            })
        })
        const data = await response.json();
        if (!response.ok) {
            Alert.alert("Erro", data.message);
            return;
        }
        Alert.alert("Sucesso","Senha Alterada com sucesso!")
        navigation.replace(`Home${tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()}`)
    }catch(error){
        console.log(error)
        Alert.alert("Erro","Não foi possivel conectar com o servidor")
    }
  }

  function redefinir() {
    if (novaSenha === '' || confirma === '') {
      Alert.alert('Erro', 'Preencha os dois campos.');
      return;
    }
    if (novaSenha.length < SENHA_MIN) {
      Alert.alert('Erro', `A senha deve ter pelo menos ${SENHA_MIN} caracteres.`);
      return;
    }
    if (novaSenha !== confirma) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }
    redefineSenha()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={'padding'}
    >
      <ScrollView
        style={{ backgroundColor: '#f9f9f9' }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.info}>Escolha a sua nova senha.</Text>

        <Text style={styles.label}>Nova senha:</Text>
        <View style={styles.senhaRow}>
          <TextInput
            style={[styles.input, styles.senhaInput]}
            placeholder={`Mínimo de ${SENHA_MIN} caracteres`}
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.olho} onPress={() => setMostrarSenha((v) => !v)}>
            <MaterialIcons
              name={mostrarSenha ? 'visibility-off' : 'visibility'}
              size={24}
              color="#667"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar nova senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita a nova senha"
          value={confirma}
          onChangeText={setConfirma}
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={redefinir}>
          <Text style={styles.buttonText}>Redefinir senha</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  info: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  senhaRow: {
    justifyContent: 'center',
  },
  senhaInput: {
    paddingRight: 45,
  },
  olho: {
    position: 'absolute',
    right: 14,
    top: 8,
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});