import React, { useReducer, createContext, useState } from 'react';
import generateID from '../helpers/generateID';
import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext'

export const DeckContext = createContext()

export function DeckProvider(props) {

    const [decks, setDecks] = useState({})

    // const [state, dispatch] = useReducer(deckReducer, [])

    // const deckReducer = (deckState, action) => {
    //     switch (action.type) {
    //         case "ADD_DECK":
    //             console.log(action.payload.title, action.payload.description)
    //             return setDecks([...decks, {title: action.payload.title, description: action.payload.description}])
    //         case "EDIT_DECK":
    //             return console.log("deck edited")
    //         case "DELETE_DECK":
    //             return console.log("deck deleted")
    //         default:
    //             return deckState
    //     }
    // }

    const saveDecks = async (decks) => {
        try {
            await AsyncStorage.setItem("decks", JSON.stringify(decks))
            console.log("successfully stored updated deck")
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
        <DeckContext.Provider value={{ decks, setDecks, saveDecks, deleteCard }}>
            {props.children}
        </DeckContext.Provider>
    )
}

    // export const { Context, Provider } = createDataContext(
    //     deckReducer,
    //     {addDeck},
    //     []
    // )

   // const onSubmit = async () => {
    //     try {
    //         await AsyncStorage.setItem('item', "item stored")
    //             .then(() => console.log("ITEM STORED"))
    //     }   catch (err) {
    //         console.log(err)
    //     }
    // }


    // {title: title, description: description, id: generateID()}

    // const addDeck =  async (title, description) => {
    //     try {
    //         setDecks([...decks, `NEW DECK ${decks.length}`])
    //         await AsyncStorage.setItem("decks", JSON.stringify(decks))
    //         console.log(decks)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const addDeck = (title, description) => {
    //     setDecks(decks => [...decks, {title: title, desription: description}])
    // }


