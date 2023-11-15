import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';


const Landing = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.landingBox}>
            </View>
            <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section1}>
            <Text style={styles.title}>FinTrack</Text>
            </LinearGradient>
            <LinearGradient colors={['#322133','#322133','#322133']} style={styles.section2}>
            </LinearGradient>
            <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section3}>
            <Text style={styles.text}>Struggling with keeping tabs on your expenses?</Text>
            <Text style={styles.text}>Lost in the maze of monthly bills, savings, and investment options?</Text>
            <Text style={styles.text}>Say hello to FinTrack+, the ultimate tool designed specifically to help you master your money.</Text>
            <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => navigation.navigate('Login')}> 
                <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

function openMenu(){
    console.log("OpenMenu");
}


const styles = StyleSheet.create({
    container:{
        flex:1
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
        marginBottom:30,
        fontSize:25,
        color:'white'
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
    }
})

export default Landing;