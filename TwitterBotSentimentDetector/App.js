import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, TextInput, Text, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {

    const [loggedIn, setLoggedIn] = React.useState("false"); //if user is logged in
    const [email, setEmail] = React.useState("nickgutz805@gmail.com"); //User Google email
    const [handle, setHandle] = React.useState(""); //most recently inputted handle
    const [amountHandles, setAmountHandles] = React.useState(0);
    const [buttonPress, setButtonPress] = React.useState("Unpressed");

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
                <Button
                    title="Write"
                    color={generateColor()}
                    onPress={() =>  writeData(false, "Hi there", )}
                />
                <Button
                    title="Read"
                    color={generateColor()}
                    onPress={() => readData("waffle")}
                />
            </SafeAreaView>
        )
    }

    const ProfileScreen = ({ navigation}) => {
        return (
            <SafeAreaView>
                <Text> User Email: {email}</Text>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={(value) => readData(value.nativeEvent.text)}
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
    const usersCollection = firestore().collection("Users").doc(email); //The collection in firebase
    let handles = {};

    const readData = async (handle) =>{
        console.log("Read Pressed")
        setHandle(handle)
        usersCollection
            .get()
            .then(documentSnapshot => {
                if(documentSnapshot.exists){
                    console.log("User Exists")
                    handles = documentSnapshot.data(); //Stores all previously inputted twitter handles
                    console.log("Handles: ",handles);
                    setAmountHandles(Object.keys(handles).length + 1) //Increment to the number for the write key
                    writeData(true, handle) //writes after determining which
                }
                else{
                    handles = {}; //Set empty list of handles
                    setAmountHandles(0)
                    console.log("User does not exist")
                    writeData(false, handle)
                }
            })
            .catch((err) => console.error("Read Error: ",err));
    }

    const writeData = async (userAlreadyExists, handle) => {
        console.log("Write Pushed")
        let key = "Handle " + amountHandles;
        if(userAlreadyExists) { //If user has previously used the app
            await usersCollection
                .update({ //adds info to preexisting document
                    [key]: handle
                })
                .then(() => {
                    console.log("Data Update Written")
                })
                .catch((err) => console.error(err))
        }
        else{ //If new users is using the app
            await usersCollection
                .set({ //creates new document for new user
                    [key]: handle
                })
                .then(() => {
                    console.log("Data Set Written")
                })
                .catch((err) => console.error("Write Error: ",err))
        }
        console.log("Write Finished")
    }

    return(
        /*
        <SafeAreaView>
            <Button
                title="Push Me"
                color={generateColor()}
                onPress={() => buttonChange()}
            />
            <Text>Button: {buttonPress}</Text>
            <Button
                title="Write"
                color={generateColor()}
                onPress={() =>  writeData()}
            />
            <Button
                title="Read"
                color={generateColor()}
                onPress={() => readData()}
            />
        </SafeAreaView>
         */
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
