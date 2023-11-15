import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { setAccessToken } from '../accessToken';
import { getAccessToken } from '../accessToken';
import Landing from './Landing'
import Dashboard from './Dashboard'

const Login = ({ navigation }) => {

//log in variables
const [UserName, setUserName] = useState(''); // Changed 'email' to 'UserName'
const [Password, setPassword] = useState('');


const [visible, setVisible] = useState(false);
const show = () => setVisible(true);
const hide = () => setVisible(false);

//sign up variables
const [FirstName, setFirstName] = useState('');
const [LastName, setLastName] = useState('');
//const [email, setSignupEmail] = useState('');



  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.29:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, Password }), // Send UserName and Password to the API
      });
      const data = await response.json();
      if(data.message === "Login successful" && data.accessToken){
        navigation.navigate('Dashboard');
        setAccessToken(data.accessToken);
        console.log(data);
        console.log("access token is:" + getAccessToken());
      } else{
        console.log("Login unsuccessful");
        console.log(data);
      }
    } catch(error) {
        console.error("An error occured: ", error)
        console.log(UserName + " " + Password);
    }

  };

  const handleSignUp = async() => {
    //sign up
    try {
        const response = await fetch('https://192.168.1.29/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ FirstName, LastName, UserName, Password,}), // Send FirstName, LastName, Username, and Password to API
        });

        const data = await response.json();
        hide();
      } catch(error) {
          console.error("An error occured: ", error)
      }
    };

    const handleForgotPass = () => {
        //forgot password
    };

    return (
    <View style={styles.container}>
        <Modal
        transparent={true}
        visible={visible}>
        <View style={{backgroundColor:"#000000aa",flex:1}}>
            <View style={{backgroundColor:"#808080",margin:50,padding:40,borderRadius:10,flex:1,}}>
                <Text style={styles.loginText}>Sign Up!</Text>
                <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="First Name"
                secureTextEntry = {false}
                onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    // placeholder not showing up
                    secureTextEntry = {false}
                    onChangeText={text => setLastName(text)}
                />
                <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="Username"
                secureTextEntry = {false}
                onChangeText={text => setUserName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    // placeholder not showing up
                    secureTextEntry = {true}
                    onChangeText={text => setPassword(text)}
                />
                {/* <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="Email"
                secureTextEntry = {false}
                onChangeText={text => setSignupEmail(text)}
                /> */}
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
        </View>

        </Modal>
        <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section1}>
        <Text style={styles.title}>FinTrack</Text>
        </LinearGradient>
        <LinearGradient colors={['#211522','#211522','#211522']} style={styles.section2}>
        </LinearGradient>
        <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section3}>
        <Text style={styles.loginText}>Login</Text>
            <TextInput
                style={styles.input}
                // placeholder not showing up
                placeholder="UserName"
                secureTextEntry = {false}
                onChangeText={text => setUserName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                // placeholder not showing up
                secureTextEntry = {true}
                onChangeText={text => setPassword(text)}
            />
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
            <Text style={styles.italicBoldText}>Forgot Password?</Text>
            <TouchableOpacity
                    onPress={handleForgotPass}>
            <Text style={styles.linkText}>Reset Now</Text>
            </TouchableOpacity>
        </LinearGradient>
    </View>
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
        flex:.4,
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
        fontSize:30,
        color:'white',
    },
    text:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
        fontSize:35,
        color:'white',
    },
    loginText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
        fontSize:35,
        color:'white',
        marginTop:20,
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
    },
    getStartedText:{
        color:'white',
        fontSize:15,
    },
    input: {
        width:200,
        height:40,
        borderColor:'white',
        borderWidth:1,
        marginBottom:10,
        paddingHorizontal:8,
        borderRadius:20,
        textAlign:'center',
        alignSelf:'center',
        color:'white',
    },
    button: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:100,
        marginBottom:20,
        alignSelf:'center',
    },
    buttonText:{
        color:'white',
    },
    italicBoldText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf:'center',
    },
    linkText: {
        textDecorationLine: 'underline',
        color: 'blue',
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf:'center',
        marginBottom:20,
    },
})
export default Login;
