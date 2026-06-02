import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import LoginAluno from './components/LoginAluno';
import LoginCozi from './components/LoginCozi';
import LoginFunc from './components/LoginFunc';

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
  );
}