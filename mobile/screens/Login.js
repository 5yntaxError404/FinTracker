import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { setAccessToken, setUserId, getUserId } from '../accessToken';
import { getAccessToken } from '../accessToken';
import Landing from './Landing'
import Dashboard from './Dashboard'
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

const Login = ({ navigation }) => {

const [showError, setShowError] = useState(false);

const [fontsLoaded] = useFonts({
    "Montserrat-Black":require("../assets/fonts/Montserrat-Black.ttf"),
})

const dismissKeyboard = () => {
    Keyboard.dismiss();
}

//log in variables
const [UserName, setUserName] = useState(''); // Changed 'email' to 'UserName'
const [Password, setPassword] = useState('');


const [visible, setVisible] = useState(false);
const show = () => setVisible(true);
const hide = () => setVisible(false);

//sign up variables
const [FirstName, setFirstName] = useState('');
const [LastName, setLastName] = useState('');
const [Email, setSignupEmail] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://www.fintech.davidumanzor.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, Password }), // Send UserName and Password to the API
      });
      const data = await response.json();
      if(data.message === "Login successful" && data.accessToken){
    //     setTimeout(() => {
    //         navigation.navigate('Dashboard');
    //       }, 1000);
        navigation.navigate('Dashboard');
        setAccessToken(data.accessToken);
        setUserId(data.UserId); // check accessToken.js and JSON return from login
        console.log(data);
        console.log("access token is:" + getAccessToken());
        console.log("userId is: " + getUserId());
        setShowError(false);
      } else{
        console.log("Login unsuccessful");
        console.log(data);
        setShowError(true);
        //Email not yet verified
      }
      Keyboard.dismiss();
    } catch(error) {
        console.error("An error occured: ", error)
        console.log(UserName + " " + Password);
    }

  };

  const handleSignUp = async() => {
    //sign up
    try {
        const response = await fetch('https://www.fintech.davidumanzor.com/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ FirstName, LastName, UserName, Password,Email}), // Send FirstName, LastName, Username, and Password to API
        });

        const data = await response.json();
        console.log(data);
        hide();
      } catch(error) {
          console.error("An error occured: ", error)
      }
    };

    // const handleForgotPass = () => {
    //     //forgot password
    // };

    return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={dismissKeyboard}
      style={styles.container}
    >
        <Modal
        transparent={true}
        visible={visible}>
        {/* <View style={{backgroundColor:"#000000aa",flex:1}}> */}
            <TouchableOpacity
            activeOpacity={1}
            onPress={dismissKeyboard}
            style={{backgroundColor:"#000000aa",flex:1}}
            >
            <View style={{backgroundColor:"#808080",margin:50,padding:40,borderRadius:10,flex:1,}}>
                <Text style={styles.loginText}>Sign Up!</Text>
                <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="First Name"
                placeholderTextColor="grey"
                secureTextEntry = {false}
                onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="grey"
                    // placeholder not showing up
                    secureTextEntry = {false}
                    onChangeText={text => setLastName(text)}
                />
                <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="Username"
                placeholderTextColor="grey"
                secureTextEntry = {false}
                onChangeText={text => setUserName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    // placeholder not showing up
                    secureTextEntry = {true}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="Email"
                placeholderTextColor="grey"
                secureTextEntry = {false}
                onChangeText={text => setSignupEmail(text)}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleSignUp}
                >
                <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={hide}
                >
                <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        {/* </View> */}

        </Modal>

        <LinearGradient colors={['#67286C','#973C9F']} style={styles.section1} start = {[0,0]} end = {[1,0]}>
        <Text style={styles.title}>FinTracker</Text>
        </LinearGradient>

        <LinearGradient colors={['#211522','#211522','#211522']} style={styles.section2}>
        </LinearGradient>

        <LinearGradient colors={['#67286C','#973C9F']} style={styles.section3} start = {[0,0]} end = {[1,0]}>
        <View style={styles.textBox}>
        <Text style={styles.loginText}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="grey"
                secureTextEntry = {false}
                onChangeText={text => setUserName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry = {true}
                onChangeText={text => setPassword(text)}
            />
            {showError && (
            <Text style={styles.errorText}>Invalid Credentials</Text>
            )}
            <TouchableOpacity 
                style={styles.button}
                onPress={handleLogin}
            >
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.italicBoldText}>Create an Account?</Text>
            <TouchableOpacity
                onPress={show}>
            <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
            {/* <Text style={styles.italicBoldText}>Forgot Password?</Text>
            <TouchableOpacity
                    onPress={handleForgotPass}>
            <Text style={styles.linkText}>Reset Now</Text>
            </TouchableOpacity> */}
        </View>
        </LinearGradient>
    </TouchableOpacity>
    );
};


function isValidEmail(email){
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    
    return pattern.test(email); 
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    textBox:{
        width:300,
        height:500,
        backgroundColor:'#211522',
        borderWidth:1,
        borderRadius:20,
        alignContent:'center',
        justifyContent:'center',
        padding:10,
        marginTop:10,
        alignSelf:"center",
    },
    menu:{
        flex:0.5,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:5,
    },
    menuText:{
        alignSelf:'flex-end',
        opacity:0.5,
        fontSize:15,
        marginTop:40,
        marginRight:10,
    },
    section1:{
        flex:.7,
        backgroundColor:'lightblue',
        justifyContent: 'center',
    },
    section2:{
        flex:.1,
        backgroundColor:'lightgreen',
    },
    section3:{
        flex:4,
        backgroundColor:'lightcoral',
        alignContent:'center',
    },
    landingBox:{
        borderWidth:1,
        backgroundColor:'purple',
        alignContent:'center',
        justifyContent:'center',

    },
    title:{
        position:'relative',
        alignSelf:'baseline',
        marginLeft:20,
        marginTop:20,
        fontSize:30,
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    text:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
        fontSize:35,
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    loginText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
        fontSize:35,
        color:'white',
        marginTop:-20,
        fontFamily: 'Montserrat-Black',
    },
    getStartedButton:{
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:100,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        fontFamily: 'Montserrat-Black',
    },
    getStartedText:{
        color:'white',
        fontSize:15,
        fontFamily: 'Montserrat-Black',
    },
    input: {
        width:200,
        height:40,
        borderColor:'white',
        borderWidth:1,
        marginBottom:20,
        paddingHorizontal:8,
        borderRadius:20,
        textAlign:'center',
        alignSelf:'center',
        color:'black',
        backgroundColor:"white",
        fontSize:18,
        fontFamily: 'Montserrat-Black',
    },
    button: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'#67286C',
        borderWidth:1,
        width:100,
        marginBottom:20,
        marginTop:10,
        alignSelf:'center',
    },
    buttonText:{
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    italicBoldText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf:'center',
        color: 'white',
        marginTop:10,
        fontFamily: 'Montserrat-Black',
    },
    linkText: {
        textDecorationLine: 'underline',
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf:'center',
        marginBottom:20,
        fontFamily: 'Montserrat-Black',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Montserrat-Black',
      },
})
export default Login;
