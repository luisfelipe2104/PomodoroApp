import React from 'react'
import { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [defaultWorkMinutes, setDefaultWorkMinutes] = useState(null)
    const [defaultPauseMinutes, setDefaultPauseMinutes] = useState(null)
    
    async function getDataInformation() {
      const dfwm = await SecureStore.getItemAsync('defaultWorkMinutes');
      const dfpm = await SecureStore.getItemAsync('defaultPauseMinutes');
  
      if (dfwm === null & dfpm === null) {
          setDefaultWorkMinutes(25);
          setDefaultPauseMinutes(5)
          await SecureStore.setItemAsync("defaultWorkMinutes", '25')
          await SecureStore.setItemAsync("defaultPauseMinutes", '5')
          console.log('not ok');
    } else {
          setDefaultWorkMinutes(parseInt(dfwm));
          setDefaultPauseMinutes(parseInt(dfpm))
          console.log("ok");
          console.log(dfwm);
      }
    }

    useEffect(() => {
        getDataInformation()
    }, [])

    useEffect(() => {
        const main = async () => {
            await SecureStore.setItemAsync("defaultWorkMinutes",  String(defaultWorkMinutes))
            await SecureStore.setItemAsync("defaultPauseMinutes", String(defaultPauseMinutes))
        }
        main()
        console.log("updated!!!");
    }, [defaultWorkMinutes, defaultPauseMinutes])

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