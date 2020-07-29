import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const DeckForm = ({ onSubmit, initialValues={title: "", colour: "white"} }) => {

    DeckForm.defaultProps = {
        title: '',
        colour: "white"
    }

    const [title, setTitle] = useState(initialValues.title)
    const [colour, setColour] = useState(initialValues.colour)

    return (
        <View>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)}/>
            <Text style={styles.label}>Set Colour:</Text>
            <RNPickerSelect
                placeholder={{label: 'Select a colour:'}}
                onValueChange={(value) => setColour(value)}
                items={[
                    {label: 'green', value: 'green', color: 'green'},
                    {label: 'blue', value: 'blue', color: 'blue'},
                    {label: 'red', value: 'red', color: 'red'},
                    {label: 'yellow', value: 'yellow', color: 'yellow'},
                    {label: 'gray', value: 'gray', color: 'slategray'},
                ]}
            />
            <TouchableOpacity 
                style={styles.saveDeckBtn}
                onPress={() => 
                    title === ""
                    ? Alert.alert("Title Required", "Decks must have a title")
                    : onSubmit(title, colour)}
            >
                <Text style={styles.btnText}>Save Deck</Text>
            </TouchableOpacity>
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
    },
    saveDeckBtn: {
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
        fontSize: 16
    }
})
