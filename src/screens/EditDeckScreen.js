import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { DeckContext } from '../context/DeckContext'
import DeckForm from '../components/DeckForm'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const EditDeckScreen = ({ navigation }) => {
    
    const {setDecks, decks, saveDecks, deleteCard} = useContext(DeckContext)
    const deckTitle = navigation.getParam("title")
    const deckID = navigation.getParam("id")
    const deckColour = navigation.getParam("colour")
    const [savedTitleChange, setSavedTitleChange] = useState(false)

    return (
        <ScrollView>
        <View>
            <Text style={styles.label}>Edit Title:</Text>
            <DeckForm 
                initialValues={{title: deckTitle, colour: deckColour}} 
                onSubmit = {async (title, colour) => {
                    try {
                        await setDecks({...decks, 
                              [deckID]: {
                                ...decks[deckID],
                                title: title,
                                colour: colour
                              }                      
                        })
                        saveDecks({...decks, 
                            [deckID]: {
                              ...decks[deckID],
                              title: title,
                              colour: colour
                            }                      
                      })
                      setSavedTitleChange(true)
                    }   catch(err) {console.log(err)}
                }}
            />
            {savedTitleChange === true && <Text style={styles.deckChangeMsg}>Deck title has been changed to {decks[deckID].title}</Text>}
            
            {/* TODO: Delete function will be added in a later version */}
            {/* <Button 
                title="Delete Deck" 
                color="red"
                onPress={async () => {
                    let newDecks = Object.keys(decks).reduce((object, key) => { if (key !== deckID) { object[key] = decks[key]} return object}, {})
                    try {
                        await setDecks(newDecks)
                        saveDecks(newDecks)
                        navigation.popToTop()
                    } catch(err) {console.log(err)}
                    }
                }
            /> */}
            
            <Text style={styles.label}>This Deck's Cards:</Text>
                <FlatList 
                    data={decks[deckID].cards}
                    keyExtractor={(item) => item.question}
                    renderItem={({ item }) => {
                        return (
                            
                                <View style={styles.row}>
                                    <View style={styles.column}>
                                        <Text>Question: {item.question.length > 25 ? `${item.question.slice(0, 24)}...` : item.question}</Text>
                                        <Text>Answer: {item.answer.length > 25 ? `${item.answer.slice(0, 24)}...` : item.answer}</Text>
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
        </ScrollView>
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
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    },
    deckChangeMsg: {
        alignSelf: "center"
    }
})
