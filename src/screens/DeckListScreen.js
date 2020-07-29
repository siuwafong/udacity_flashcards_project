import React, { useContext, useEffect } from 'react'
import { DeckContext } from '../context/DeckContext'
import { StatsContext } from '../context/StatsContext'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { setLocalNotification } from '../helpers/notification'

const DeckListScreen = ({ navigation }) => {

    const { decks, getDecksData } = useContext(DeckContext)
    const { getStatsData } = useContext(StatsContext)

    useEffect(() => {
        getDecksData()
        getStatsData()
        setLocalNotification()
    }, [])

    const deckList = Object.keys(decks).map(key => {
        return decks[key]
    }).sort( function(a, b) {
        let textA = a.title.toUpperCase();
        let textB = b.title.toUpperCase();
        return (textA < textB ) ? -1 : (textA > textB) ? 1 : 0; 
    })

    return (
        <View style={styles.deckList}>
            
            <TouchableOpacity style={styles.addDeck} onPress={() => navigation.navigate('CreateDeck')}>
                <View >
                    <Text style={{fontSize: 28}}>
                    <Feather name="plus" size={24} color="black" />
                        Add a Deck
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
            <View style={styles.deckList}>
                {deckList.length === 0 
                ? 
                <Text style={styles.noDecksMessage}>
                    No decks found.  Click on the 'Add a Deck' button above to get started! 
                </Text>
                :
                <View> 
                    <FlatList 
                        data={deckList.sort((a, b) => a.title - b.title)}
                        keyExtractor={(deck) => deck.id}
                        renderItem={ ({ item }) => {
                            return (
                            <View style={styles.deckView}>
                                <TouchableOpacity style={[styles.deck, {backgroundColor: item.colour} ]} onPress={() => navigation.navigate("Deck", {id: item.id} )}>
                                    <Text style={[styles.title, item.colour === "red" || item.colour === "blue" && {color: "white"}]}>{item.title}</Text>
                                    <Text style={item.colour === "red" || item.colour === "blue" && {color: "white"}}>{item.cards.length} cards</Text>
                                </TouchableOpacity>
                            </View>
                            )
                        }}
                    />
                </View>
                }
            </View>
            </ScrollView>

            <TouchableOpacity onPress={() => console.log(deckList)}> 
                <Text>Print Decks</Text> 
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => console.log(bestQuizScore, quizAttempts)}> 
                <Text>Print Stats</Text> 
            </TouchableOpacity> */}

        </View>
    )
}

export default DeckListScreen

const styles = StyleSheet.create({
    addDeck: {
        backgroundColor: "slategray",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "center",
        fontSize: 24,
        marginVertical: 40,
        borderRadius: 10,
        width: 180,
        height: 50,
    },
    deck: {
        height: 100, 
        width: 300,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,   
        marginHorizontal: 20,
        marginVertical: 20, 
        alignItems: "center",
        justifyContent: "center"   
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    deckList: {
        justifyContent: "space-around",
        alignItems: "center"
    },
    noDecksMessage: {
        marginHorizontal: 20,
        marginTop: 60,
    },
    deckView: {
        marginTop: 10,
    }
})
