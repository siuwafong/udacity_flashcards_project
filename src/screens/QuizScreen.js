import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DeckContext } from '../context/DeckContext'

const QuizScreen = ({ navigation }) => {

    const deckID = navigation.getParam('id').toString()
    const {setDecks, decks, saveDecks} = useContext(DeckContext)

    const [showAnswer, setShowAnswer] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [quizScore, setQuizScore] = useState(0)

    const nextQuestion = (answer) => {
        setQuestionNumber(questionNumber + 1)
        setShowAnswer(false)
        answer === "correct" && setQuizScore(quizScore + 1)
    }

    const restartQuiz = () => {
        setQuestionNumber(1)
        setShowAnswer(false)
        setQuizScore(0)
    }

    return (
        <View>
            {questionNumber <= decks[deckID].cards.length
            ?
                <> 
                <Text>Question {questionNumber} / {decks[deckID].cards.length}</Text>
                <Text>{decks[deckID].cards[questionNumber - 1].question}</Text>

                {showAnswer === false 
                ?
                    <TouchableOpacity onPress={() => setShowAnswer(true)}>
                        <Text>Show Answer</Text>
                    </TouchableOpacity>
                :
                    <>
                    <Text>{decks[deckID].cards[questionNumber - 1].answer}</Text>
                    <TouchableOpacity onPress={() => nextQuestion("correct")}>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => nextQuestion("incorrect")}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                    </>
                }    
                
                </>
            :
                <>
                <Text>Quiz Finished</Text>
                <Text>Your final score is {quizScore}/{decks[deckID].cards.length} </Text>
                
                <TouchableOpacity onPress={() => restartQuiz()}><Text>Restart Quiz</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("DeckList")}><Text>Back to Decks</Text></TouchableOpacity>
                </>
            }
        </View>
    )
}

export default QuizScreen

const styles = StyleSheet.create({})
