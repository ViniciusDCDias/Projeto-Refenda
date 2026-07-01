import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/HomeScreen';
import LoginAluno from './src/components/LoginAluno';
import LoginCozi from './src/components/LoginCozi';
import LoginFunc from './src/components/LoginFunc';
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
        </Stack.Navigator>

      </NavigationContainer>
    </AuthProvider>
  );
}