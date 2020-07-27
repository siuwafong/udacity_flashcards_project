import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button ,Alert } from 'react-native'

const DeckForm = ({ onSubmit, initialValues={title: ""} }) => {

    DeckForm.defaultProps = {
        title: '',
    }

    const [title, setTitle] = useState(initialValues.title)
    // const [description, setDescription] = useState(initialValues.description)

    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)}/>
            {/* <Text style={styles.label}>Enter Description:</Text>
            <TextInput style={styles.input} value={description} onChangeText={(text) => setDescription(text)}/> */}
            <Button 
                title="Save Deck" 
                onPress={() => 
                    title === ""
                    ? Alert.alert("Title Required", "Decks must have a title")
                    : onSubmit(title)}
            />
    </View>
    )
}

export default DeckForm

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
