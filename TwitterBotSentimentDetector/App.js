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
    const [buttonPress, setButtonPress] = React.useState("Unpressed");
    const [userID, setUserID] = React.useState("");
    const [botometerScore, setBotometerScore] = React.useState(1);
    const [data, setData] = React.useState({
                                                        handle: "",
                                                        follower1: "",
                                                        follower2: "",
                                                        follower3: "",
                                                        handleScore:"",
                                                        handleMagnitude:"",
                                                        score1:"",
                                                        magnitude1:"",
                                                        score2:"",
                                                        magnitude2:"",
                                                        score3:"",
                                                        magnitude3:""
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
                <Button
                    title="Screen Responsive Test"
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
                <Text>UserID: {userID}</Text>
                <Text>Botometer Score: {botometerScore}</Text>
                <Text>Submitted Handel: {data.handle}, Score: {data.handleScore}, Magnitude: {data.handleMagnitude}</Text>
                <Text>Follower 1: {data.follower1}, Score: {data.score1}, Magnitude: {data.magnitude1}</Text>
                <Text>Follower 2: {data.follower2}, Score: {data.score2}, Magnitude: {data.magnitude2}</Text>
                <Text>Follower 3: {data.follower3}, Score: {data.score3}, Magnitude: {data.magnitude3}</Text>
                <Button
                    title="Clear Data"
                    color={generateColor()}
                    onPress={() => clearData()}
                />
                <Button
                    title="Sign Out"
                    color={generateColor()}
                    onPress={() => googleSignOut(navigation)}
                />
            </SafeAreaView>
        )
    };

    //Data Functions

    let buttonChange = () => {
        if(buttonPress === "Unpressed"){
            setButtonPress("Pressed");
        }
        else{
            setButtonPress("Unpressed");
        }
    }

    let clearData = () => {
        setUserID("")
        setBotometerScore(1) //set Botscore back to 0
        setData({ //Reset NLP data
            handle: "",
            follower1: "",
            follower2: "",
            follower3: "",
            handleScore:"",
            handleMagnitude:"",
            score1:"",
            magnitude1:"",
            score2:"",
            magnitude2:"",
            score3:"",
            magnitude3:""
        })
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
                    userCheckApiCall(true, handle, Object.keys(totalHandles).length); //send handle to Twitter API to check if user exists
                }
                else{
                    handles = {}; //Set empty list of handles
                    console.log("User does not exist")
                    userCheckApiCall(false, handle, 0) //send handle to Twitter API to check if user exists
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

    //Api Calls

    const userCheckApiCall = (accountExists, handle, amountHandles) => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        let jason = {handle: handle}
        fetch("http://10.0.2.2:5000/data", {
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body: JSON.stringify(jason)
        }).then((res) =>
            res.json().then((data) => {
                console.log("Data: ",data.UserID);
                // Setting a data from api
                if(data.UserID === -1){
                    alert("User not found")
                    setUserID("Does Not Exist")
                    setBotometerScore(1) //set Botscore back to 0
                    setData({ //Reset NLP data
                        handle: "",
                        follower1: "",
                        follower2: "",
                        follower3: "",
                        handleScore:"",
                        handleMagnitude:"",
                        score1:"",
                        magnitude1:"",
                        score2:"",
                        magnitude2:"",
                        score3:"",
                        magnitude3:""
                    })
                }
                else if(data.UserID === 0){
                    alert("User Not Authorized")
                    setUserID("Not Authorized")
                    setBotometerScore(1) //set Botscore back to 0
                    setData({ //Reset NLP Data
                        handle: "",
                        follower1: "",
                        follower2: "",
                        follower3: "",
                        handleScore:"",
                        handleMagnitude:"",
                        score1:"",
                        magnitude1:"",
                        score2:"",
                        magnitude2:"",
                        score3:"",
                        magnitude3:""
                    })
                }
                else {
                    setUserID("Exists")
                    writeData(accountExists, handle, amountHandles) //write to firebase only if user exists
                        .then(r => console.log("UserCheck write complete"))
                    botometerApiCall(handle);
                }
            })
        )
        .catch((err) => {
                console.error("User Check Fetch Error: ",err)
        });
    };

    const botometerApiCall = (handle) => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        let jason = {handle: handle}
        fetch("http://10.0.2.2:8000/data", {
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body: JSON.stringify(jason)
        }).then((res) =>
            res.json().then((data) => {
                console.log("Data: ",data.Botscore);
                // Setting a data from api
                setBotometerScore(data.Botscore)
                googleApiCall(handle); //Call Google Api
            })
        )
        .catch((err) => {
            console.error("Botometer Fetch Error: ",err)
        });
    };

    let googleApiCall = (handle) => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        let jason = {handle: handle}
        fetch("http://10.0.2.2:8080/data", {
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body: JSON.stringify(jason)
        }).then((res) =>
            res.json().then((data) => {
                console.log("Data: ",data);
                // Setting a data from api
                setData({
                        handle: data.Handle,
                        follower1: data.Follower1,
                        follower2: data.Follower2,
                        follower3: data.Follower3,
                        handleScore: data.HandleScore,
                        handleMagnitude: data.HandleMagnitude,
                        score1: data.Score1,
                        magnitude1: data.Magnitude1,
                        score2: data.Score2,
                        magnitude2: data.Magnitude2,
                        score3: data.Score3,
                        magnitude3: data.Magnitude3
                    })
            })
        )
            .catch((err) => {
                console.error("Google NLP Fetch Error: ",err)
            });
    };

    //Display

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
