import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  let test = 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    console.log(count);
    
    return () => clearInterval(intervalId);
  }, [count])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!{count}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
