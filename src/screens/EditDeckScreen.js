import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { DeckContext } from '../context/DeckContext'
import DeckForm from '../components/DeckForm'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const EditDeckScreen = ({ navigation }) => {
    
    const {setDecks, decks, saveDecks, deleteCard} = useContext(DeckContext)
    const deckTitle = navigation.getParam("title")
    const deckID = navigation.getParam("id")
    const [savedTitleChange, setSavedTitleChange] = useState(false)

    return (
        <View>
            <Text style={styles.label}>Edit Title:</Text>
            <DeckForm 
                initialValues={{title: deckTitle}} 
                onSubmit = {async (title) => {
                    try {
                        await setDecks({...decks, 
                              [deckID]: {
                                ...decks[deckID],
                                title: title,
                              }                      
                        })
                        saveDecks({...decks, 
                            [deckID]: {
                              ...decks[deckID],
                              title: title,
                            }                      
                      })
                      setSavedTitleChange(true)
                    }   catch(err) {console.log(err)}
                }}
            />
            {savedTitleChange === true && <Text>Deck title has been changed to {decks[deckID].title}</Text>}
            <Text>Cards</Text>
            <FlatList 
                data={decks[deckID].cards}
                keyExtractor={(item) => item.question}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Question: {item.question}</Text>
                                <Text>Answer: {item.answer}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("EditQuestion", {deckID: deckID, cardID: item.id})}>
                                <MaterialCommunityIcons name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteCard(deckID, item.id)}>
                                <MaterialIcons name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default EditDeckScreen

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'  
    },
    column: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        flex: 1
    }
})
