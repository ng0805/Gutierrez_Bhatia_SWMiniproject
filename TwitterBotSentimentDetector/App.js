import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, TextInput, Text, Button} from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const App = () => {

    const [loggedIn, setloggedIn] = React.useState("false");
    const [userInfo, setuserInfo] = React.useState([]);
    const [buttonPress, setButtonPress] = React.useState("Unpressed");

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '1003272958417-uh10sb2pfgjvts2jf9mhhu61n4s5mp4k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    let _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            setloggedIn("true");
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                setloggedIn("canceled");
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

    let signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn("false");
            setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    let buttonChange = () => {
        if(buttonPress === "Unpressed"){
            setButtonPress("Pressed");
        }
        else{
            setButtonPress("Unpressed");
        }
    }

    return(
        <SafeAreaView>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}/>

            <Text>IsLoggedIn: {loggedIn} </Text>

            <Button
                title="Push Me"
                color="#841584"
                onPress={() => buttonChange()}
            />
            <Text>Button: {buttonPress}</Text>
            <Button
                title="Sign Out"
                color="#841584"
                onPress={() => signOut()}
            />
        </SafeAreaView>
    )
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
