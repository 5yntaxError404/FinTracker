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

            <LinearGradient 
            colors={['#67286C','#973C9F']} style={styles.section1} start = {[0,0]} end = {[1,0]}>
            <Text style={styles.title}>FinTracker</Text>
            </LinearGradient>

            <LinearGradient colors={['#322133','#322133','#322133']} style={styles.section2} start = {[0,0]} end = {[1,0]}>
            </LinearGradient>

            <LinearGradient colors={['#67286C','#973C9F']} style={styles.section3}>
            <View style={styles.textBox}>
            <Text style={styles.text}>Struggling with keeping tabs on your expenses?</Text>
            <Text style={styles.text}>Lost in the maze of monthly bills, savings, and investment options?</Text>
            <Text style={styles.text}>Say hello to FinTracker, the ultimate tool designed specifically to help you master your money.</Text>

            <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => navigation.navigate('Login')}> 
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>

            </View>
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
    },
    text:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
        fontSize:25,
        color:'white',
        marginTop:10,
    },
    getStartedButton:{
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'#67286C',
        borderWidth:1,
        width:100,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:30,
    },
    getStartedText:{
        color:'white',
        fontSize:15,
    }
})

export default Landing;