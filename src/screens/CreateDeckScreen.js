import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeckForm from '../components/DeckForm'
import { DeckContext } from '../context/DeckContext'
import generateID from '../helpers/generateID'

const CreateDeckScreen = ({ navigation }) => {

    const {setDecks, decks, saveDecks} = useContext(DeckContext)
    
    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <DeckForm 
                onSubmit={async (title, colour) => {
                    try {
                        let ID = generateID()
                        await setDecks({...decks, [ID]: {title, id: ID, cards: [], dateCreated: new Date(), colour: colour}})
                        saveDecks({...decks, [ID]: {title, id: ID, cards: [], dateCreated: new Date(), colour: colour}})
                        navigation.navigate("Deck", {id: ID}) }
                        catch(err) {console.log(err)}
                }}
            />
        </View>
        
    )
}

export default CreateDeckScreen

const styles = StyleSheet.create({

})
