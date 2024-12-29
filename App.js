import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState("")
  const [isFlowing, setIsFlowing] = useState(true)
  const [isStopped, setIsStopped] = useState(false)

  const timeIsOver = () => {
    setIsFlowing(!isFlowing)
    if (isFlowing) {
      setMinutes(25)
    }
    else if (!isFlowing) {
      setMinutes(5)
    }
  }

  const formatTime = () => {
    const result = `${minutes < 10 ? "0" + minutes : minutes }:${seconds < 10 ? "0" + seconds : seconds}`
    setTime(result)
    return result
  }

  const tick = () => {
    if (minutes === 0 & seconds === 0) {
      timeIsOver()
    }
    else if (seconds === 0) {
      setSeconds(59)
      setMinutes(minutes - 1)
    } 
    else {
      setSeconds(seconds - 1)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    console.log(count);
    tick()
    formatTime()
    return () => clearInterval(intervalId);
  }, [count])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!{count}</Text>
      <Text>{time}</Text>
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
