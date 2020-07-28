import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatsContext } from '../context/StatsContext'
import { DeckContext } from '../context/DeckContext'

const StatsScreen = () => {

    const { bestQuizScore, quizAttempts } = useContext(StatsContext)
    const { decks } = useContext(DeckContext)

    const deckList = Object.keys(decks).map(key => {
        return decks[key]
    })


    return (
        <View>
            <Text>Your Stats</Text>

            <Text>You've attempted a total of {quizAttempts} quizzes</Text>

            <Text>{bestQuizScore.id !== 0 && `Your best score was ${bestQuizScore.score}% for the quiz "${decks[bestQuizScore.id].title}"`}</Text>

            <Text>You have a total of {deckList.length} deck(s) and {deckList.reduce((a, b) => a + b.cards.length, 0)} cards.</Text>

        </View>
    )
}

export default StatsScreen

const styles = StyleSheet.create({})
