import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { getAccessToken } from '../accessToken';

const Dashboard = ({ navigation }) => {

    const [visibleBankPopup, setVisibleBankPopup] = useState(false);
    const showBankPopup = () => setVisibleBankPopup(true);
    const hideBankPopup = () => setVisibleBankPopup(false);

    const [visibleBudgetPopup, setVisibleBudgetPopup] = useState(false);
    const showBudgetPopup = () => setVisibleBudgetPopup(true);
    const hideBudgetPopup = () => setVisibleBudgetPopup(false);

    const [visibleAccountPopup, setVisibleAccountPopup] = useState(false);
    const showAccountPopup = () => setVisibleAccountPopup(true);
    const hideAccountPopup = () => setVisibleAccountPopup(false);

    // main box
    const [name , setName] = useState("John Doe");
    const updateName = () => {
        setName();
    }

    const [monthlyIncome , setMonthlyIncome] = useState("$2000");
    const updateMonthlyIncome = () => {
        setMonthlyIncome();
    }

    const [rent , setRent] = useState("$900");
    const updateRent = () => {
        setRent();
    }

    const [utilites , setUtilities] = useState("$100");
    const updateUtilities = () => {
        setUtilities();
    }

    const [groceries , setGroceries] = useState("$150");
    const updateGroceries = () => {
        setGroceries();
    }

    const [insuranceBill , setInsuranceBill] = useState("$350");
    const updateInsuranceBill = () => {
        setInsuranceBill();
    }

    const [phoneBill , setPhoneBill] = useState("$30");
    const updatePhoneBill = () => {
        setPhoneBill();
    }

    const [gasBill , setGasBill] = useState("$30");
    const updateGasBill = () => {
        setGasBill();
    }

    const [fun , setFunBill] = useState("$100");
    const updateFunBill = () => {
        setFunBill();
    }

    const [monthlyGoal , setMonthlyGoal] = useState("$100");
    const updateMonthlyGoal = () => {
        setMonthlyGoal();
    }

    //budget box
    const [currentBudgetGoalName , setCurrentBudgetGoalName] = useState("Example goal");
    const updateBudgetGoalName = () => {
        setCurrentBudgetGoalName();
    }
    
    const [currentBudgetSaved , setcurrentBudgetSaved] = useState(0);
    const updateCurrentBudgetSaved = () => {
        setcurrentBudgetSaved();
    }

    const [currentBudgetGoal , setCurrentBudgetGoal] = useState(3000);
    const updateBudgetGoal = () => {
        setCurrentBudgetGoal();
    }

    const [budgetMonthlySavingGoal , setBudgetMonthlySavingGoal] = useState(100);
    const updateBudgetMonthlySavingGoal = () => {
        setBudgetMonthlySavingGoal();
    }

    // Achievement box
    const achievementArr = [];

    // Account information
    const [AccountNum, setAccountNumber] = useState('');
    const oldAccountNum = AccountNum;
    const [RouteNum, setRouteNumber] = useState('');
    const [BankName, setBankName] = useState('');

    const [newAccountNum, setNewAccountNumber] = useState('');
    const [newRouteNum, setNewRouteNumber] = useState('');
    const [newBankName, setNewBankName] = useState('');

    //CRUD functions for bank account

    //create bank account
    const createBankAccount = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/accounts/add/667', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });

            const data = await response.json();
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error);
                console.log(`Bearer ${getAccessToken()}`);
            }
        };

    //read bank account
    const readBankAccount = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/account', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({AccountNum}),
            });

            const data = await response.json();
            console.log(data);
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    //update bank account
    const updateBankAccount = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/accounts/edit/667', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({oldAccountNum, newAccountNum, newRouteNum, newBankName}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    const deleteBankAccount = async() => {
        //delete
        try {
            const response = await fetch('http://192.168.1.29:5000/api/accounts/delete', {
                method: 'DEL',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({AccountNum}),
            });
            const data = await response.json();
            console.log(data);
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    //CRUD operations for Budget
    const createBudget = async() => {
        //create
        try {
            const response = await fetch('http://192.168.1.29:5000/api/accounts/add/667', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });

            const data = await response.json();
            hideBankPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const readBudget = async() => {
        //read
        try {
            const response = await fetch('https://192.168.1.29/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({AccountNum}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBankPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const updateBudget = async() => {
        //update
        try {
            const response = await fetch('https://192.168.1.29/api/accounts/edit/668', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBankPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const deleteBudget = async() => {
        //delete
        try {
            const response = await fetch('https://192.168.1.29/api/accounts/delete', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });
            const data = await response.json();
            console.log(data);
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    //Edit and Delete Account Info
    const updateAccountInfo = async() => {
        //update
        try {
            const response = await fetch('http://192.168.1.29:5000/api/users/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBankPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const deleteAccountInfo = async() => {
        //delete
        try {
            const response = await fetch('http://192.168.1.29:5000/api/users/delete', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({AccountNum, RouteNum, BankName,}),
            });
            const data = await response.json();
            console.log(data);
            hideBankPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section1}>
            </LinearGradient>
            <LinearGradient colors={['#211522','#211522','#211522']} style={styles.section2}>
            </LinearGradient>
            <LinearGradient colors={['#613659','#613659','#613659']} style={styles.section3}>

            {/* Bank info popup */}
            <Modal
            transparent={true}
            visible={visibleBankPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:50,padding:40,borderRadius:10,flex:1,}}>

                    <Text style={styles.loginText}>Bank CRUD</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    secureTextEntry = {false}
                    onChangeText={text => setAccountNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Route Number"
                    secureTextEntry = {false}
                    onChangeText={text => setRouteNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Bank Name"
                    secureTextEntry = {false}
                    onChangeText={text => setBankName(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="New Account Number"
                    secureTextEntry = {false}
                    onChangeText={text => setNewAccountNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="New Route Number"
                    secureTextEntry = {false}
                    onChangeText={text => setNewRouteNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="New Bank Name"
                    secureTextEntry = {false}
                    onChangeText={text => setNewBankName(text)}
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={createBankAccount}
                    >
                    <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={readBankAccount}
                    >
                    <Text style={styles.buttonText}>Read Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={updateBankAccount}
                    >
                    <Text style={styles.buttonText}>Update Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={deleteBankAccount}
                    >
                    <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={hideBankPopup}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </Modal>

            {/* Account info popup */}
            <Modal
            transparent={true}
            visible={visibleBankPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:50,padding:40,borderRadius:10,flex:1,}}>

                    <Text style={styles.loginText}>Account CRUD</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    secureTextEntry = {false}
                    onChangeText={text => setAccountNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Route Number"
                    secureTextEntry = {false}
                    onChangeText={text => setRouteNumber(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Bank Name"
                    secureTextEntry = {false}
                    onChangeText={text => setBankName(text)}
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={createBankAccount}
                    >
                    <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={readBankAccount}
                    >
                    <Text style={styles.buttonText}>Read Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={updateBankAccount}
                    >
                    <Text style={styles.buttonText}>Update Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={deleteBankAccount}
                    >
                    <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={hideBankPopup}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </Modal>


            {/* banking detail CRUD */}
            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBankPopup}
                        >
                            <Text style={{color:'white'}}>Add Banking Details</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBankPopup}
                        >
                            <Text style={{color:'white'}}>Read Banking Details</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBankPopup}
                        >
                            <Text style={{color:'white'}}>Update Banking Details</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBankPopup}
                        >
                            <Text style={{color:'white'}}>Delete Banking Details</Text>    
            </TouchableOpacity>


            {/* budget CRUD */}
            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log(getAccessToken())}
                        >
                            <Text style={{color:'white'}}>Add Budget</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log(getAccessToken())}
                        >
                            <Text style={{color:'white'}}>Read Budget</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Update Budget")}
                        >
                            <Text style={{color:'white'}}>Update Budget</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Delete Budget")}
                        >
                            <Text style={{color:'white'}}>Delete Budget</Text>    
            </TouchableOpacity>

            {/* edit and delete main account info */}
            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Edit account info")}
                        >
                            <Text style={{color:'white'}}>Edit Account Info</Text>    
            </TouchableOpacity>

            <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Delete account info")}
                        >
                            <Text style={{color:'white'}}>Delete Account Info</Text>    
            </TouchableOpacity>

                {/* <View style={styles.dashboardMainBox}>
                    <View style={styles.innerBox}>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:20, marginTop:-50,marginBottom:5}}>Hello {name}!</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Monthly Income: {monthlyIncome}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Utilities: {utilites}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Groceries: {groceries}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Insurance Bills: {insuranceBill}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Phone: {phoneBill}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Gas: {gasBill}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Fun: {fun}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15}}>Budget Monthly Goal: {monthlyGoal}</Text>

                        <TouchableOpacity
                            style={styles.transactionButton}
                            //onPress should navigate to transaction page
                            onPress={() => console.log("budget button pressed")}
                        >
                            <Text style={{color:'white'}}>Add  Transaction</Text>    
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log("view transaction button pressed")}>
                        <Text style={styles.linkText}>View Transactions</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.dashboardBudgetBox}>
                    <View style={styles.innerBox}>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15, marginTop:-130, marginBottom:5}}>Budget Goal: {currentBudgetGoalName}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15, marginBottom:5}}>Total: ${currentBudgetSaved}/${currentBudgetGoal}</Text>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:15, marginBottom:5}}>Monthly Savings Goal: ${budgetMonthlySavingGoal}</Text>

                        <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Add budget")}
                        >
                            <Text style={{color:'white'}}>Add Budget</Text>    
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={() => console.log("Edit Account")}
                        >
                            <Text style={{color:'white'}}>Edit Account</Text>    
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.dashboardAchievementBox}>
                    <View style={styles.innerBox}>
                        <Text style={{color:'white', fontWeight:'bold',fontSize:20, marginTop:-280}}>Achievements</Text>
                    </View>
               
               
                </View> */}
            </LinearGradient>
        </View>
        );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
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
    transactionButton: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:'100%',
        alignSelf:'center',
        marginTop:10,
        marginBottom:5,
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
        marginBottom:20,
        marginLeft:115,
    },
    dashboardMainBox: {
        width:'99%',
        height:'50%',
        padding:5,
    },
    dashboardBudgetBox: {
        width:'60%',
        height:'50%',
        padding:5,
        marginTop:-5
    },
    dashboardAchievementBox: {
        width:'40%',
        height:'50%',
        padding:5,
        marginLeft:220,
        marginTop:-319,
        alignItems:'center',
        justifyContent: 'flex-start',
    },
    innerBox: {
        flex:1,
        backgroundColor: '#411845',
        alignItems:'flex-start',
        justifyContent:'center',
        padding:5
    },
    button: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:100,
        marginBottom:10,
        alignSelf:'center',
    },
})

export default Dashboard;