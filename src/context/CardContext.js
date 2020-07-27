import React, { useReducer, createContext } from 'react';

export const CardContext = createContext()

export function CardProvider(props) {
    const cardMsg = "THIS IS A CARD MSG"

    const [state, dispatch] = useReducer(cardReducer, {})

    const cardReducer = (state, action) => {
        // TODO: change the return function for each case
        switch (action.type) {
            case "ADD":
                return console.log("card added")
            case "EDIT":
                return console.log("card edited")
            case "DELETE":
                return console.log("card deleted")
            default:
                return state
        }
    }

    return (
        <CardContext.Provider value={{ cardReducer, cardMsg }}>
            {props.children}
        </CardContext.Provider>
    )
}