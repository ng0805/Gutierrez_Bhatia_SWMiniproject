import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    const [text, onChangeText] = React.useState(null);

    const LoginScreen = ({ navigation }) => {
        return(
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={(value) => displayText(value.nativeEvent.text, navigation)}
                    placeholder="Enter Login to go to profile page"
                />
                <Text>Submit Text: {text} </Text>
            </SafeAreaView>
        )
    }

    const ProfileScreen = ({ navigation}) => {
        return (
            <SafeAreaView>
                <Text>This is Nick's profile</Text>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={(value) => displayText(value.nativeEvent.text, navigation)}
                    placeholder="Submit Sign Out to return to login page"
                />
                <Text>Profile Text: {text} </Text>
            </SafeAreaView>
        )
    };



    let displayText = (val, navigation) => {
        if(val === "Login"){
            navigation.navigate('Profile')
            //onChangeText("");
        }
        else if(val === "Sign Out"){
            navigation.navigate('Login')
            //onChangeText("");
        }
        else {
            onChangeText(val);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
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

export default App;
