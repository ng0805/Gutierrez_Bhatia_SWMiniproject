import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);

    let displayText = (val) => {
        onChangeText(val)
    };

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onSubmitEditing={(value) => displayText(value.nativeEvent.text)}
                placeholder="Text Submit Placeholder"
            />
            <Text>Submit Text: {text} </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Numeric Change Placeholder"
                keyboardType="numeric"
            />
            <Text>Changed Num: {number}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default UselessTextInput;
