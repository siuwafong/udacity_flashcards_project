import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { SettingsContext } from '../context/SettingsContext'
import AsyncStorage from '@react-native-community/async-storage';
import { DeckContext } from '../context/DeckContext'
import { StatsContext } from '../context/StatsContext'

const OptionsScreen = () => {

    const { darkMode, setDarkMode, largeFont, setLargeFont, randomizeQuestions, setRandomizeQuestions } = useContext(SettingsContext)
    const { setDecks } = useContext(DeckContext)
    const { setQuizAttempts, setBestQuizScore} = useContext(StatsContext)

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            setDecks({})
            setQuizAttempts(0)
            setBestQuizScore({score: 0, id: 0})
            console.log('Storage successfully cleared!')
        } catch (err) {
            console.log('Failed to clear AsyncStorage')
        }
    }

    const attemptClearStorage = () => {
        Alert.alert(
            "Clear Storage",
            "This will delete all of your data.  Are you sure?",
            [
                {
                    text: "Yes",
                    onPress: () => clearStorage()
                },
                {
                    text: "No",
                    onPress: () => console.log("Clear Storage canceled"),
                    style: 'cancel'
                }
            ],
            { cancelable: false}
        )
    }

    return (
        <View style={styles.container }>
            <Text style={styles.message}>The settings will be completed in a later version.</Text>
            
            <View style={styles.option}>
                <Text>Dark Mode</Text>
                <CheckBox
                    disabled={false}
                    value={darkMode}
                    onValueChange={() => setDarkMode(!darkMode)}
                />
            </View>
            <View style={styles.option}>
                <Text>Large Font</Text>
                <CheckBox
                    disabled={false}
                    value={largeFont}
                    onValueChange={() => setLargeFont(!largeFont)}
                />
            </View>
            <View style={styles.option}>
                <Text>Randomize Questions</Text>
                <CheckBox
                    disabled={false}
                    value={randomizeQuestions }
                    onValueChange={() => setRandomizeQuestions(!randomizeQuestions)}
                />
            </View>

            <TouchableOpacity 
                style={styles.clearStorageBtn}    
                onPress={() => attemptClearStorage()}
            > 
                <Text style={styles.btnText}>Clear All Data</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default OptionsScreen

const styles = StyleSheet.create({
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        marginHorizontal: 30,
        marginVertical: 10,
        flex: 1,
        justifyContent: "center",
        marginBottom: 40
    },
    message: {
        color: "red",
    },
    clearStorageBtn: {
        alignSelf: "center",
        height: 70,
        width: 160,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        borderRadius: 10,
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 16,
    }
})
