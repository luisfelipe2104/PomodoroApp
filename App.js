import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react'
import TimerScreen from './screens/TimerScreen/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from './screens/ConfigScreen/Index';

const Stack = createNativeStackNavigator()

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Timer" options={{headerShown: false}} component={TimerScreen} />
        <Stack.Screen name="Config" options={{headerShown: false}} component={ConfigScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
