import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { DeckContext } from '../context/DeckContext'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DeckScreen = ({ navigation }) => {
    
    const deckID = navigation.getParam('id').toString()
    const {setDecks, decks, saveDecks} = useContext(DeckContext)

    
    return (
        <View>
            <Text>{decks[deckID].title}</Text>
            <Text>{decks[deckID].cards.length} cards</Text>

            <Button 
                title="Start Quiz" 
                onPress={() => 
                    decks[deckID].cards.length === 0
                    ? Alert.alert("Cannot Start Quiz", "You need at least one card to do a quiz.")
                    : navigation.navigate("Quiz", {id: deckID})} 
            
            />
            <TouchableOpacity onPress={() => navigation.navigate("CreateQuestion", {id: deckID})}><Text>Add Questions</Text></TouchableOpacity>
            <TouchableOpacity><Text>View/Edit Quiz</Text></TouchableOpacity>
        </View>
    )
}

export default DeckScreen

const styles = StyleSheet.create({})
