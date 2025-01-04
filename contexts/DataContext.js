import React from 'react'
import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [defaultWorkMinutes, setDefaultWorkMinutes] = useState(25)
    const [defaultPauseMinutes, setDefaultPauseMinutes] = useState(5)
    
    async function getDataInformation() {
      let dfwm = await SecureStore.getItemAsync('defaultWorkMinutes');
      let dfpm = await SecureStore.getItemAsync('defaultPauseMinutes');
  
      if (dfwm != null & dfpm != null) {
        setDefaultWorkMinutes(parseInt(dfwm));
        setDefaultPauseMinutes(parseInt(dfpm))
        console.log("ok");
      } else {
        setDefaultWorkMinutes(25);
        setDefaultPauseMinutes(5)
        await SecureStore.setItemAsync("defaultWorkMinutes", '25')
        await SecureStore.setItemAsync("defaultPauseMinutes", '5')
        console.log('not ok');
      }
    }

    useEffect(() => {
        getDataInformation()
    }, [])

  return (
    <DataContext.Provider
        value={{
            defaultWorkMinutes,
            defaultPauseMinutes,
            setDefaultWorkMinutes,
            setDefaultPauseMinutes,
            getDataInformation
        }}
    >
        { children }
    </DataContext.Provider>
  )
}