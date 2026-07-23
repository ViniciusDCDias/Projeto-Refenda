import React, {useContext,useEffect, useState} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Alert,TextInput} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useFonts, ZenDots_400Regular } from '@expo-google-fonts/zen-dots';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';


export default function CreateUser({navigation}){
    const {token} = useContext(AuthContext)
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
    const [nome,setNome] = useState('')
    const [email,setemail] = useState('')
    const [senha,setSenha] = useState('')
    const [tipo,setTipo] = useState('')
    const [ra,setRA] = useState('')

    const create = async () => {
        try{
            if (ra == ''){
                setRA(null)
            }
            const response = await fetch("http://192.168.0.230:3000/users", {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body:JSON.stringify({
                    novo:{
                        nome:nome,
                        email:email,
                        senha:senha,
                        tipo:tipo,
                        ra:ra
                    }
                })
            })
            
            const data = await response.json()

            if (!response.ok){
                Alert.alert("Erro",data.message)
                return
            }else{
                Alert.alert("Sucesso",data.message)
                navigation.replace("HomeCozi")
            }

        }catch(error){
            console.log(error)
            Alert.alert("Erro","Não foi possivel conectar com o servidor")
        }
    }
    const EntradaValida = () => {
        if (nome == "" || email === "" ||  tipo == "") {
        Alert.alert(
            "Erro",
            "Há campos obrigatorios vazios"
        );
        return;
        }
        if(!senha){
            setSenha("Etec@195")
        }
        create();
    
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerS}>
                <Text style={styles.title}>Preencha os dados: </Text>
            </View>
            <Text style={styles.EveryText}>Nome:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite o nome dele(a)"
            value={nome}
            onChangeText={setNome}
            />  
            <Text style={styles.EveryText}>Email:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite seu email dele(a)"
            value={email}
            onChangeText={setemail}
            />
            <Text style={styles.EveryText}>Senha:</Text>
            <TextInput 
            style={styles.input}
            placeholder="Digite a senha(se manter em branco será utilizada a padrão)"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            />
            {tipo === "ALUNO" && 
                <>
                    <Text style={styles.EveryText}>RA:</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder="Digite a senha(se manter em branco será utilizada a padrão)"
                    value={ra}
                    onChangeText={setRA}
                    />   
                </>
            }
            <View style={styles.radio}>
                <Text style={styles.EveryText}>Qual o tipo de Usuario: </Text>
                {['ALUNO', 'FUNCIONARIO', 'GESTOR'].map((opcao) => (
                    <TouchableOpacity 
                    key={opcao} 
                    style={styles.radioOption} 
                    onPress={() => setTipo(opcao)}
                    >
                    {/* Desenha a bolinha do radio */}
                    <View style={[
                        styles.radioCircle, 
                        tipo === opcao && styles.selectedRadioCircle
                    ]}>
                        {tipo === opcao && <View style={styles.radioInnerDot} />}
                    </View>
                    <Text style={styles.RadioText}>{opcao}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.containerS}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={EntradaValida}
                >
                    <Text style={styles.buttonText}>Criar Usuario</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    fontFamily:'Inter_400Regular'
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
        marginBottom: 20,
        fontFamily:'Inter_400Regular'
    },
    input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius:50,
    fontFamily:'Inter_400Regular'
    },
    button:{
    width:100,
    height:40,
    backgroundColor:"#1976d2",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    },
    buttonText:{
    color:"#fff",
    fontFamily:'Inter_400Regular'
    },
    radio:{ 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 20 },
        radioOption: {
        flexDirection: 'row',
        marginLeft:20,
        alignItems: 'center',
    },
    EveryText:{
        fontSize:19,
        marginBottom:10,
        alignSelf:'center',
        fontFamily:'Inter_400Regular'
    },
    RadioText:{
        fontSize:19,
        alignSelf:'center',
        fontFamily:'Inter_400Regular'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1976d2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    selectedRadioCircle: {
        borderColor: '#1976d2',
    },
    radioInnerDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#1976d2',
    },
})