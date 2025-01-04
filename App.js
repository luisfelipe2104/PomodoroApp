import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react'
import TimerScreen from './screens/TimerScreen/Index';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from './screens/ConfigScreen/Index';
import { DataProvider } from './contexts/DataContext';

const Stack = createNativeStackNavigator()

export default function App() {
  
  return (
    <View style={{flex: 1, backgroundColor: '#1E213F',}}>
      <NavigationContainer>
        <DataProvider>
          <Stack.Navigator screenOptions={{animationEnabled: false}} initialRouteName='Timer'>
            <Stack.Screen name="Timer" options={{headerShown: false}} component={TimerScreen} />
            <Stack.Screen name="Config" options={{headerShown: false}} component={ConfigScreen} />
          </Stack.Navigator>
        </DataProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}
