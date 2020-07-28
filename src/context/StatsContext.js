import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const StatsContext = createContext()

export function StatsProvider(props) {

    const [bestQuizScore, setBestQuizScore] = useState({score: 0, id: 0})
    const [quizAttempts, setQuizAttempts] = useState(0)

    const saveOverallStats = async (stats) => {
        try {
            await AsyncStorage.setItem("stats", JSON.stringify(stats))
            console.log("successfully stored updated stats")
        } catch (err) {
            console.log(err)
        }
    }

    const getStatsData = async () => {
        try {
            const stats = await AsyncStorage.getItem("stats")
            if (stats !== null) {
                setBestQuizScore(JSON.parse(stats).bestQuizScore)
                setQuizAttempts(JSON.parse(stats).quizAttempts)
            } else {console.log("no data in stats!")}
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <StatsContext.Provider value={{ bestQuizScore, setBestQuizScore, quizAttempts, setQuizAttempts, saveOverallStats, getStatsData }}>
            {props.children}
        </StatsContext.Provider>
    )
}