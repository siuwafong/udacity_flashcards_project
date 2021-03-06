import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QuestionForm from '../components/QuestionForm'
import { DeckContext } from '../context/DeckContext'
import generateID from '../helpers/generateID'

const CreateQuestionScreen = ({ navigation }) => {

    const deckID = navigation.getParam('id').toString()
    const {setDecks, decks, saveDecks} = useContext(DeckContext)
    let randomID = generateID()

    return (
        <View style={styles.container}>
            <QuestionForm 
                onSubmit={async (question, answer) => {
                    try {
                        await setDecks(
                            {...decks, 
                                [deckID]: {
                                    ...decks[deckID],
                                    cards: decks[deckID].cards.concat({
                                        question: question, 
                                        answer: answer,
                                        id: randomID
                                    })
                                }
                            })
                        saveDecks(
                            {...decks, 
                                [deckID]: {
                                    ...decks[deckID],
                                    cards: decks[deckID].cards.concat({
                                        question: question, 
                                        answer: answer,
                                        id: randomID
                                    })
                                }
                            })
                    } catch(err) {console.log(err)}
                }}
            />

            <Text style={styles.cardCountMsg}>
                This deck currently has {decks[deckID].cards.length} card(s).
            </Text>
        </View>
    )
}

export default CreateQuestionScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    cardCountMsg: {
        alignSelf: "center",
        fontSize: 16,
    }
})
