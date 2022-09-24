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
    const [data, setData] = React.useState({
                                                        name: "",
                                                        age: 0,
                                                        date: "",
                                                        programming: "",
                                                    })

    //Google Sign-in Functions

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '1003272958417-uh10sb2pfgjvts2jf9mhhu61n4s5mp4k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    /*
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("http://10.0.2.2:5000/data", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body: JSON.stringify({ handle: 'React Hooks POST Request Example' })
            }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setData({
                    name: data.Name.title,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        )
        .catch((err) => console.error("Flask Post Error: ",err));
    }, []);
     */

    const apiCall = (handle) => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch("http://10.0.2.2:5000/data", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body: JSON.stringify({ handle: {handle} })
            }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setData({
                    name: data.Name.handle,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        )
        .catch((err) => console.error("Flask Post Error: ",err));
    };

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
                <Text>Name: {data.name.handle}</Text>
                <Text>Age: {data.age}</Text>
                <Text>Date: {data.date}</Text>
                <Text>Programming: {data.programming}</Text>
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
        let totalHandles
        setHandle(handle);
        usersCollection
            .get()
            .then(documentSnapshot => {
                if(documentSnapshot.exists){
                    console.log("User Exists")
                    totalHandles = documentSnapshot.data(); //Stores all previously inputted twitter handles
                    console.log("Total Handles: ",totalHandles);
                    writeData(true, handle, Object.keys(totalHandles).length) //writes after determining which
                    apiCall(handle);
                }
                else{
                    handles = {}; //Set empty list of handles
                    console.log("User does not exist")
                    writeData(false, handle, 0)
                    apiCall(handle)
                }
            })
            .catch((err) => console.error("Read Error: ",err));
    }

    const writeData = async (userAlreadyExists, handle, numHandles) => {
        console.log("Write Pushed")
        let keyVal = numHandles+1;
        let key = "Handle " + keyVal; //gets next number for handle key
        console.log("Key: ", key);
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
