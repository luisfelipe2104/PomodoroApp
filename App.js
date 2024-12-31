import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect, useContext } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
  const [count, setCount] = useState(0)
  const [defaultWorkMinutes, setDefaultWorkMinutes] = useState(25)
  const [defaultPauseMinutes, setDefaultPauseMinutes] = useState(5)
  const [minutes, setMinutes] = useState(defaultWorkMinutes)
  const [seconds, setSeconds] = useState(0)
  const [timePercent, setTimePercent] = useState(100)
  const [time, setTime] = useState(`${defaultWorkMinutes}:00`)
  const [isPaused, setIsPaused] = useState(false)
  const [isStopped, setIsStopped] = useState(true)

  const playBeep = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/beep.mp3') // Update the path to your beep sound file
      );
      await sound.playAsync();
      // Unload the sound after playback to free resources
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  const timeIsOver = () => {
    // gambiarra
    setIsPaused(!isPaused)
    Vibration.vibrate(3000)
    playBeep()
    if (isPaused) {
      setMinutes(defaultWorkMinutes)
    }
    else if (!isPaused) {
      setMinutes(defaultPauseMinutes)
    }

  }

  const formatTime = () => {
    const result = `${minutes < 10 ? "0" + minutes : minutes }:${seconds < 10 ? "0" + seconds : seconds}`
    setTime(result)
    const workMinutesPercent = (((minutes * 60) + seconds) * 100) / (isPaused === false ? 60 * defaultWorkMinutes : 60 * defaultPauseMinutes)
    setTimePercent(Math.floor(workMinutesPercent))
    return result
  }

  const buttonPress = () => {
    setIsStopped(!isStopped)
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
    if (!isStopped) {
      const intervalId = setInterval(() => {
        setCount(count + 1)
      }, 1000)
      console.log(count);
      console.log(isPaused);
      console.log(timePercent);
      tick()
      formatTime()
      return () => clearInterval(intervalId);
    }
  }, [count, isStopped])
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => buttonPress()} style={styles.button}>
        <CircularProgress
          value={timePercent}
          showProgressValue={false}
          subtitle={isStopped === true ? "Start" : "Pause"}
          subtitleStyle={styles.subtitle}
          title={time}
          titleStyle={styles.title}
          inActiveStrokeColor={isStopped ? 'red' : '#2ecc71'}
          inActiveStrokeOpacity={0.2}
          activeStrokeColor={isStopped ? 'red': '#2ecc71'}
        />
      </TouchableOpacity>

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
  button: {
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    color: 'green',
    display: 'flex',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  subtitle: {
    color: '#2ecc71',
    fontSize: 15,
    display: 'flex',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
});
