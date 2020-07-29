import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { DeckContext } from '../context/DeckContext'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DeckScreen = ({ navigation }) => {
    
    const deckID = navigation.getParam('id').toString()
    const { decks } = useContext(DeckContext)

    return (
        <View style={styles.container}>
            <Text style={styles.deckTitle}>{decks[deckID].title}</Text>
            <Text style={styles.cardCount}>{decks[deckID].cards.length} cards</Text>

            <TouchableOpacity
                style={styles.startQuizBtn} 
                onPress={() => 
                    decks[deckID].cards.length === 0
                    ? Alert.alert("Cannot Start Quiz", "You need at least one card to do a quiz.")
                    : navigation.navigate("Quiz", {id: deckID})} 
            >
                <Text style={styles.btnText}>START QUIZ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.addQuestionsBtn}
                onPress={() => navigation.navigate("CreateQuestion", {id: deckID})}
            >
                <Text style={styles.btnText}>Add Questions</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.editQuizBtn} 
                onPress={() => navigation.navigate("EditDeck", {id: deckID, title: decks[deckID].title, colour: decks[deckID].colour})}>
                    <Text style={styles.btnText}>View/Edit Quiz</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DeckScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    deckTitle: {
        fontSize: 30,
        marginVertical: 20,
    },
    cardCount: {
        fontSize: 20,
        marginBottom: 10,
    },
    startQuizBtn: {
        height: 80,
        width: 140,
        backgroundColor: "cornflowerblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 20
    },
    addQuestionsBtn: {
        height: 80,
        width: 140,
        backgroundColor: "mediumaquamarine",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 20
    },
    editQuizBtn: {
        height: 80,
        width: 140,
        backgroundColor: "sienna",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 20
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 16
    }
})
