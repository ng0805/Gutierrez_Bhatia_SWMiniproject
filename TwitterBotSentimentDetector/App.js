import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, TextInput, Text, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {

    const [loggedIn, setLoggedIn] = React.useState("false");
    const [email, setEmail] = React.useState("");
    const [handle, setHandle] = React.useState("");
    const [buttonPress, setButtonPress] = React.useState("Unpressed");
    const [write, setWrite] = React.useState("UnWritten");
    const [read, setRead] = React.useState("UnRead");

    //Google Sign-in Functions

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '1003272958417-uh10sb2pfgjvts2jf9mhhu61n4s5mp4k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    let googleSignIn = async (navigation) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setEmail(userInfo.user.email)
            setLoggedIn("true");
            navigation.navigate('Profile'); //Navigate to Profile Page if successful
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                setLoggedIn("canceled");
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Sign in in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    let googleSignOut = async (navigation) => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setLoggedIn("false");
            setEmail("");
            navigation.navigate('Login'); //Navigate back to Login Page
        } catch (error) {
            console.error(error);
        }
    };

    //Navigation Pages

    const generateColor = () => { //Generates Random Hex Color
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    const LoginScreen = ({ navigation }) => {
        return(
            <SafeAreaView>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleSignIn(navigation)}/>
                <Text>IsLoggedIn: {loggedIn} </Text>
                <Button
                    title="Push Me"
                    color={generateColor()}
                    onPress={() => buttonChange()}
                />
                <Text>Button: {buttonPress}</Text>
            </SafeAreaView>
        )
    }

    const ProfileScreen = ({ navigation}) => {
        return (
            <SafeAreaView>
                <Text> User Email: {email}</Text>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={(value) => setHandle(value.nativeEvent.text)}
                    placeholder="Enter Twitter Handle"
                />
                <Text>Entered Handle: {handle} </Text>
                <Button
                    title="Push Me"
                    color={generateColor()}
                    onPress={() => buttonChange()}
                />
                <Text>Button: {buttonPress}</Text>
                <Button
                    title="Write"
                    color={generateColor()}
                    onPress={() => writeData()}
                />
                <Text>Write: {write}</Text>
                <Button
                    title="Read"
                    color={generateColor()}
                    onPress={() => readData()}
                />
                <Text>Read: {read}</Text>

                <Button
                    title="Sign Out"
                    color={generateColor()}
                    onPress={() => googleSignOut(navigation)}
                />
                <Text>IsLoggedIn: {loggedIn} </Text>
            </SafeAreaView>
        )
    };

    //Firebase Functions

    let buttonChange = () => {
        if(buttonPress === "Unpressed"){
            setButtonPress("Pressed");
        }
        else{
            setButtonPress("Unpressed");
        }
    }

    const usersCollection = firestore().collection('Users').doc('waffle@house.com');

    const writeData = async () => {
        if(write === "UnWritten"){
            setWrite("Written")
        }
        else{
            setWrite("UnWritten")
        }
    }

    const readData = async () => {
        await firestore()
            .collection('Users')
            .doc('waffle@house.com')
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                }
            });
        if(read === "UnRead"){
            setRead("Read")
        }
        else{
            setRead("UnRead")
        }
    }

    return(
        //Opens on Login Screen
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
