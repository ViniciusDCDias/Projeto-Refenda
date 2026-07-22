import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/HomeScreen';

import LoginAluno from './src/components/Aluno/LoginAluno';
import HomeAluno from './src/components/Aluno/HomeAluno';
import AgenAluno from './src/components/Aluno/AgenAluno';
import CalenAluno from './src/components/Aluno/CalenAluno';
import HistAluno from './src/components/Aluno/HistAluno';
import Agendar from './src/components/Aluno/AgenAluno';

import LoginCozi from './src/components/Gestor/LoginCozi';
import HomeCozi from './src/components/Gestor/HomeGestor'
import CreateUser from './src/components/Gestor/createUser';
import GerirUsers from './src/components/Gestor/gerirUsers';

import HomeFunc from './src/components/Funcionario/HomeFunc';
import LoginFunc from './src/components/Funcionario/LoginFunc';

import {AuthProvider} from './src/context/AuthContext'

import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  ZenDots_400Regular
} from '@expo-google-fonts/zen-dots';

import {
  Inter_400Regular
} from '@expo-google-fonts/inter';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {

  const [ready, setReady] = useState(false);

  const [fontsLoaded] = useFonts({
    ZenDots_400Regular,
    Inter_400Regular,
  });

  useEffect(() => {

    async function prepare() {

      if (fontsLoaded) {

        await SplashScreen.hideAsync();

        setReady(true);
      }
    }

    prepare();

  }, [fontsLoaded]);

  if (!ready) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginAluno"
            component={LoginAluno}
            options={{ title: 'Login do Aluno' }}
          />

          <Stack.Screen
            name="LoginCozi"
            component={LoginCozi}
            options={{ title: 'Login da Gestão' }}
          />

          <Stack.Screen
            name="LoginFunc"
            component={LoginFunc}
            options={{ title: 'Login do Funcionario' }}
          />

          <Stack.Screen
            name="HomeAluno"
            component={HomeAluno}
            options={{ headerShown:false}}
          />

          <Stack.Screen
            name="CalenAluno"
            component={CalenAluno}
            options={{ title: 'Calendario Semanal' }}
          />

          <Stack.Screen 
            name="HomeFunc" 
            component={HomeFunc} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen
            name="Agendar"
            component={AgenAluno}
            options={{ title: 'Agendamento de Refeição' }}
          />

          <Stack.Screen
            name="Historico"
            component={HistAluno}
            options={{ title: 'Historico de Agendamentos' }}
          />

          <Stack.Screen 
            name="HomeCozi" 
            component={HomeCozi} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen 
            name="GerirUsers" 
            component={GerirUsers} 
            options={{ title:'Gerenciamento de Usuarios'}} 
          />

          <Stack.Screen 
            name="CreateUser" 
            component={CreateUser} 
            options={{ title:'Inserir dados do novo usuario'}} 
          />

        </Stack.Navigator>

      </NavigationContainer>
    </AuthProvider>
  );
}