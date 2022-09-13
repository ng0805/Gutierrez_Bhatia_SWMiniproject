import React, {useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const Stack = createNativeStackNavigator();

const App = () => {
    const [text, onChangeText] = React.useState(null);
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const LoginScreen = ({ navigation }) => {
        return(
            <SafeAreaView>
                <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleSignIn(navigation)}
                />
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
                <button onClick={() => googleSignOut(navigation)}>
                    Sign Out
                </button>
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
        if(val ===  "Login".toLowerCase()){
            navigation.navigate('Profile')
            onChangeText("");
        }
        else if(val === "Sign Out".toLowerCase()){
            navigation.navigate('Login')
            onChangeText("");
        }
        else {
            onChangeText(val);
        }
    };

    let googleSignIn = async (navigation) => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            setloggedIn(true);
            navigation.navigate('Profile');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                navigation.navigate('Login');
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                navigation.navigate('Login');
            } else {
                alert('Error Signing In');
                navigation.navigate('Login');
            }
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    let googleSignOut = async (navigation) => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
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
