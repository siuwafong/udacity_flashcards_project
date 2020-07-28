import React, { useContext, useReducer, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native'
import DeckForm from '../components/DeckForm'
import { DeckContext } from '../context/DeckContext'
import generateID from '../helpers/generateID'

const CreateDeckScreen = ({ navigation }) => {

    const {setDecks, decks, saveDecks} = useContext(DeckContext)
    
    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <DeckForm 
                onSubmit={async (title) => {
                    try {
                        let ID = generateID()
                        await setDecks({...decks, [ID]: {title, id: ID, cards: [], lastCompleted: new Date()}})
                        saveDecks({...decks, [ID]: {title, id: ID, cards: [], lastCompleted: new Date()}})
                        navigation.navigate("Deck", {id: ID}) }
                        catch(err) {console.log(err)}
                }}
            />

            {/* <TouchableOpacity onPress={() => console.log(decks)}><Text>Print Decks</Text></TouchableOpacity> */}
        </View>
        
    )
}

export default CreateDeckScreen

const styles = StyleSheet.create({

})
