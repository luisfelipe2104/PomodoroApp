import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Vibration, Text } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect, useContext } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { DataContext } from '../../contexts/DataContext';

export default function TimerScreen({ navigation }) {
  const { defaultWorkMinutes, defaultPauseMinutes } = useContext(DataContext)
  const [count, setCount] = useState(0)
  const [minutes, setMinutes] = useState(defaultWorkMinutes)
  const [seconds, setSeconds] = useState(0)
  const [timePercent, setTimePercent] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const [isStopped, setIsStopped] = useState(true)

  const playBeep = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/beep.mp3') // Update the path to your beep sound file
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
    Vibration.vibrate(1500)
    playBeep()
    if (isPaused) {
      setMinutes(defaultWorkMinutes)
    }
    else if (!isPaused) {
      setMinutes(defaultPauseMinutes)
    }
  }

  const buttonPress = () => {
    setIsStopped(!isStopped)
    Vibration.vibrate(100)
  }

  const onLongPressButton = () => {
    setIsStopped(true)
    Vibration.vibrate(100)
    navigation.navigate("Config")
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
    // sets the percent
    const workMinutesPercent = (((minutes * 60) + seconds) * 100) / (isPaused === false ? 60 * defaultWorkMinutes : 60 * defaultPauseMinutes)
    setTimePercent(workMinutesPercent.toFixed(2)) // alternative Math.floor()
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
      return () => clearInterval(intervalId);
    }
  }, [count, isStopped])

  useEffect(() => {
    setMinutes(defaultWorkMinutes)
    
  }, [defaultWorkMinutes, defaultPauseMinutes])

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={() => onLongPressButton()} onPress={() => buttonPress()} style={styles.button}>
        <CircularProgress
          radius={120}
          value={timePercent}
          titleColor={isStopped ? '#ad1a1f' :'#1ab85e'}
          subtitleColor={isStopped ? '#78191c' : '#10572f'}
          inActiveStrokeWidth={40}
          activeStrokeWidth={20}
          showProgressValue={false}
          subtitle={isStopped === true ? "Start" : "Pause"}
          subtitleStyle={styles.subtitle}
          title={`${minutes < 10 ? "0" + minutes : minutes }:${seconds < 10 ? "0" + seconds : seconds}`}
          titleStyle={styles.title}
          inActiveStrokeColor={isStopped ? 'red' : '#2465FD'}
          inActiveStrokeOpacity={0.2}
          activeStrokeColor={isStopped ? '#d9141a': '#2465FD'}
          circleBackgroundColor='rgba(30, 33, 63, 1)'
          activeStrokeSecondaryColor={isStopped ? '#a63a3e' : '#C25AFF'}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E213F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1E213F'
  },
  title: {
    fontSize: 45,
    display: 'flex',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 25,
    display: 'flex',
    fontStyle: 'italic',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
});
