import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'

const QuestionForm = ({ onSubmit, initialValues={question: "", answer: ""} }) => {

    QuestionForm.defaultProps = {
        title: "",
        answer: ""
    }

    const [question, setQuestion] = useState(initialValues.title)
    const [answer, setAnswer] = useState(initialValues.description)

    return (
        <View>
            <Text style={styles.label}>Enter Question:</Text>
            <TextInput style={styles.input} value={question} onChangeText={(text) => setQuestion(text)}/>
            <Text style={styles.label}>Enter Answer:</Text>
            <TextInput style={styles.input} value={answer} onChangeText={(text) => setAnswer(text)}/>
            <Button 
                title="Save Question" 
                onPress={() => 
                    (question === "" || answer === "")
                    ? Alert.alert("Incomplete Card", "You must give both a question and answer")
                    : onSubmit(question, answer)
                        .then(() => setAnswer(""))
                        .then(() => setQuestion(""))
                }
            />
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
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    }
})
