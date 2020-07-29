import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'

const QuestionForm = ({ onSubmit, initialValues={question: "", answer: ""} }) => {
    
    QuestionForm.defaultProps = {
        title: "",
        answer: ""
    }

    const [question, setQuestion] = useState(initialValues.question)
    const [answer, setAnswer] = useState(initialValues.answer)

    return (
        <View>
            <Text style={styles.label}>Enter Question:</Text>
            <TextInput style={styles.input} value={question} onChangeText={(text) => setQuestion(text)}/>
            <Text style={styles.label}>Enter Answer:</Text>
            <TextInput style={styles.input} value={answer} onChangeText={(text) => setAnswer(text)}/>
            <TouchableOpacity 
                style={styles.saveQuestionBtn}
                onPress={() => 
                    (question === "" || answer === "")
                    ? Alert.alert("Incomplete Card", "You must give both a question and answer")
                    : onSubmit(question, answer)
                        .then(() => setAnswer(""))
                        .then(() => setQuestion(""))
                }
            >
                <Text style={styles.btnText}>Save Question</Text>
            </TouchableOpacity>
    </View>
    )
}

export default QuestionForm

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5,
        height: 80,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    }, 
    saveQuestionBtn: {
        height: 80,
        width: 140,
        backgroundColor: "cornflowerblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: "center"
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 16,
    }
})
