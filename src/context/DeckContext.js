import React, { useReducer, createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const DeckContext = createContext()

export function DeckProvider(props) {

    const [decks, setDecks] = useState({})

    const saveDecks = async (decks) => {
        try {
            await AsyncStorage.setItem("decks", JSON.stringify(decks))
            console.log("successfully stored updated deck")
        } catch (err) {
            console.log(err)
        }
    }

    const getDecksData = async () => {
        try {
            const data = await AsyncStorage.getItem("decks")
            if (data !== null) {
                setDecks(JSON.parse(data))
            } else {console.log("no data in decks!")}
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCard = async (deckId, cardId) => {
        try {
            await setDecks(
                {...decks,
                    [deckId]: {
                        ...decks[deckId],
                        cards: decks[deckId].cards.filter((card) => card.id !== cardId)
                    }
                })
            saveDecks(
                {...decks,
                    [deckId]: {
                        ...decks[deckId],
                        cards: decks[deckId].cards.filter((card) => card.id !== cardId)
                    }
                })
        } catch(err) {console.log(err)}
    }

    return (
        <DeckContext.Provider value={{ decks, setDecks, saveDecks, deleteCard, getDecksData }}>
            {props.children}
        </DeckContext.Provider>
    )
}



