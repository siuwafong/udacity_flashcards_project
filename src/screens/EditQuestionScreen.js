import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import QuestionForm from '../components/QuestionForm'
import { DeckContext } from '../context/DeckContext'

const EditQuestionScreen = ({ navigation }) => {
    
    const {setDecks, decks, saveDecks} = useContext(DeckContext)
    const cardID = navigation.getParam("cardID")
    const deckID = navigation.getParam("deckID")
    let selectedCard = decks[deckID].cards.find(item => item.id === cardID)
    
    return (
        <View>
            <QuestionForm 
                initialValues={{question: selectedCard.question, answer: selectedCard.answer}}
                onSubmit={async (question, answer) => { 
                    try {
                        await setDecks({...decks, 
                            [deckID]: {
                                ...decks[deckID],
                                cards: decks[deckID].cards.map((card) => 
                                    card.id !== cardID ? card : {question: question, answer: answer, id: card.id}
                                ) 
                            }
                        })
                        saveDecks({...decks, 
                            [deckID]: {
                                ...decks[deckID],
                                cards: decks[deckID].cards.map((card) => 
                                    card.id !== cardID ? card : {question: question, answer: answer, id: card.id}
                                ) 
                            }
                        })
                    } catch(err) {console.log(err)}
                    navigation.pop()
                    }
                }                
            />
            <Text>fff</Text>
        </View>
    )
}

export default EditQuestionScreen

const styles = StyleSheet.create({})
