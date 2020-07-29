import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DeckContext } from '../context/DeckContext'
import { StatsContext } from '../context/StatsContext'

const QuizScreen = ({ navigation }) => {

    const deckID = navigation.getParam('id').toString()
    const {decks} = useContext(DeckContext)
    const { bestQuizScore, setBestQuizScore, quizAttempts, setQuizAttempts, saveOverallStats } = useContext(StatsContext)

    const [showAnswer, setShowAnswer] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [quizScore, setQuizScore] = useState(0)
    
    const quizScorePercentage = (quizScore / decks[deckID].cards.length * 100).toFixed(1)
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

    const setQuizStats = async () => {
        try {
        await setQuizAttempts(quizAttempts + 1)
        if(Number(quizScorePercentage) > Number(bestQuizScore.score))  {
             setBestQuizScore({score: quizScorePercentage, id: decks[deckID].id})
        }
        saveOverallStats({bestQuizScore, quizAttempts})
        } catch(err) {console.log(err)}
    }

    return (
        <View style={styles.container}>
            {questionNumber <= decks[deckID].cards.length
            ?
                <> 
                <Text style={styles.questionCount}>Question {questionNumber} / {decks[deckID].cards.length}</Text>
                <Text style={styles.questionText}>Question: {decks[deckID].cards[questionNumber - 1].question}</Text>

                {showAnswer === false 
                ?
                    <TouchableOpacity 
                        style={styles.showAnswerBtn}
                        onPress={() => setShowAnswer(true)}
                    >
                        <Text style={styles.btnText}>Show Answer</Text>
                    </TouchableOpacity>
                :
                    <>
                    <Text style={styles.questionText}>Answer: {decks[deckID].cards[questionNumber - 1].answer}</Text>
                    
                    <View style={styles.btnRow}>
                        <TouchableOpacity 
                            style={styles.correctBtn}
                            onPress={() => nextQuestion("correct")}
                        >
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.incorrectBtn}
                            onPress={() => nextQuestion("incorrect")}
                        >
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                    
                    </>
                }    
                
                </>
            :
                <View style={styles.endContainer}>
                <Text style={styles.finishQuizMsg}>Quiz Finished</Text>
                <Text>Your final score is {quizScore}/{decks[deckID].cards.length} - {quizScorePercentage}% </Text>

                    <View style={styles.btnRow}>     
                        <TouchableOpacity 
                            style={styles.restartQuizBtn}
                            onPress={() => setQuizStats().then(restartQuiz())}
                        >
                                <Text style={styles.btnText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.goToDeckListBtn}
                            onPress={() => setQuizStats().then(navigation.navigate("DeckList"))}
                        >
                                <Text style={styles.btnText}>Back to Decks</Text
                        ></TouchableOpacity>
                    </View>
                </View>
            }
            {/* <TouchableOpacity onPress={() => console.log(bestQuizScore, quizAttempts)}><Text>View Stats </Text></TouchableOpacity> */}
        </View>
    )
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        
    },
    questionCount: {
        fontSize: 16,
        marginLeft: 10,
        alignSelf: "flex-start",
        marginBottom: 120,
    },
    showAnswerBtn: {
        height: 70,
        width: 150,
        backgroundColor: "mediumaquamarine",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    questionText: {
        fontSize: 16,
        marginVertical: 15,
    },
    btnRow: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,
    },
    correctBtn: {
        height: 70,
        width: 120,
        backgroundColor: "limegreen",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30,
        marginRight: 20,
    },
    incorrectBtn: {
        height: 70,
        width: 120,
        backgroundColor: "indianred",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
    },
    finishQuizMsg: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 20,
    },
    endContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    restartQuizBtn: {
        height: 70,
        width: 120,
        backgroundColor: "mediumaquamarine",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
    },
    goToDeckListBtn: {
        height: 70,
        width: 120,
        backgroundColor: "khaki",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
    }
})
