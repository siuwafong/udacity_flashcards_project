import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { SettingsContext } from '../context/SettingsContext'

const OptionsScreen = () => {

    const { darkMode, setDarkMode, largeFont, setLargeFont, randomizeQuestions, setRandomizeQuestions } = useContext(SettingsContext)

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
    },
    message: {
        color: "red",
    }
})
