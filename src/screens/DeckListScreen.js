import React, { useContext, useEffect } from 'react'
import { DeckContext } from '../context/DeckContext'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { setLocalNotification } from '../helpers/notification'

const DeckListScreen = ({ navigation }) => {

    const { decks, setDecks } = useContext(DeckContext)

    const deckList = Object.keys(decks).map(key => {
        return decks[key]
    })

    const clearStorage = async() => {
        try {
            await AsyncStorage.clear()
            console.log('Storage successfully cleared!')
        } catch (err) {
            console.log('Failed to clear AsyncStorage')
        }
    }

    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem("decks")
            if (data !== null) {
                setDecks(JSON.parse(data))
            } else {console.log("no data in decks!")}
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        setLocalNotification()
        // Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        //     if (status === 'granted') {
        //         Notifications.scheduleNotificationAsync({
        //             content: {
        //                 title: "Alert!",
        //                 body: "This is a notification!"
        //             },
        //             trigger: {
        //                 seconds: 120,
        //             }
        //         })
        //     }
        //   })   
    }, [])

    return (
        <View>
            
            <TouchableOpacity onPress={() => navigation.navigate('CreateDeck')}>
                <View style={styles.addDeck}>
                    <Text style={{fontSize: 20}}>
                    <Feather name="plus" size={24} color="black" />
                        Add a Deck
                    </Text>
                </View>
            </TouchableOpacity>

            <View>
                {decks.length === 0 
                ? 
                <Text>
                    No decks found.  Click on the 'Add a Deck' button above to get started! 
                </Text>
                : 
                <FlatList 
                    data={deckList}
                    keyExtractor={(deck) => deck.id}
                    renderItem={ ({ item }) => {
                        return (
                        <View>
                            <TouchableOpacity style={styles.deck} onPress={() => navigation.navigate("Deck", {id: item.id} )}>
                                <Text>{item.title}</Text>
                                <Text>Number of Cards - {item.cards.length}</Text>
                            </TouchableOpacity>
                        </View>
                        )
                    }}
                />}
            </View>

            <TouchableOpacity onPress={() => console.log(deckList)}> 
                <Text>Print Decks</Text> 
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => clearStorage()}> 
                <Text>Clear Storage</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default DeckListScreen

const styles = StyleSheet.create({
    addDeck: {
        flexDirection: "row",
        backgroundColor: "slategray",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "center",
        fontSize: 30
    },
    deck: {
        height: 100, 
        width: 100,
        backgroundColor: "green"
    }
})
