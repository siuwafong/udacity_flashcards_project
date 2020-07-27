import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import QuestionForm from '../components/QuestionForm'
import DeckScreen from './DeckScreen'
import { DeckContext } from '../context/DeckContext'

const CreateQuestionScreen = ({ navigation }) => {

    const deckID = navigation.getParam('id').toString()
    const {setDecks, decks, saveDecks} = useContext(DeckContext)

    return (
        <View>
            <QuestionForm 
                onSubmit={async (question, answer) => {
                    try {
                        await setDecks(
                            {...decks, 
                                [deckID]: {
                                    ...decks[deckID],
                                    cards: decks[deckID].cards.concat({question: question, answer: answer})
                                }
                            })
                        saveDecks(
                            {...decks, 
                                [deckID]: {
                                    ...decks[deckID],
                                    cards: decks[deckID].cards.concat({question: question, answer: answer})
                                }
                            })
                    } catch(err) {console.log(err)}
                }}
            />

            <Text>This deck currently has {decks[deckID].cards.length} card(s).</Text>
            <TouchableOpacity onPress={() => console.log(decks)}> 
                <Text>Print Decks</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default CreateQuestionScreen

const styles = StyleSheet.create({})
