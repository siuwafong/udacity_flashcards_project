import React, { useState, createContext } from 'react';

export const SettingsContext = createContext()

export function SettingsProvider(props) {

    const [darkMode, setDarkMode] = useState(false)
    const [largeFont, setLargeFont] = useState(false)
    const [randomizeQuestions, setRandomizeQuestions] = useState(false)


    return (
        <SettingsContext.Provider value={{ darkMode, setDarkMode, largeFont, setLargeFont, randomizeQuestions, setRandomizeQuestions }}>
            {props.children}
        </SettingsContext.Provider>
    )
}