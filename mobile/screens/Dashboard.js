import React, {useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { getAccessToken } from '../accessToken';
import { PieChart } from 'react-native-svg-charts';
import { useFonts } from 'expo-font';

const Dashboard = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
        "Montserrat-Black":require("../assets/fonts/Montserrat-Black.ttf"),
    })

    const [visibleTransactionPopup, setVisibleTransactionPopup] = useState(false);
    const showTransactionPopup = () => setVisibleTransactionPopup(true);
    const hideTransactionPopup = () => setVisibleTransactionPopup(false);

    // Budget BODY
    const[MonthlyIncome, setMonthlyIncome] = useState(0.0);
    const[rent, setRent] = useState(0.0);
    const[utilities, setUtilities] = useState(0.0);
    const[groceries, setGroceries] = useState(0.0);
    const[insurance, setInsurance] = useState(0.0);
    const[phone, setPhone] = useState(0.0);
    const[car, setCar] = useState(0.0);
    const[gas, setGas] = useState(0.0);
    const[fun, setFun] = useState(0.0);
    const[goal, setGoal] = useState(0.0);
    const[GoalDescription, setGoalDescription] = useState('');
    const[GoalAmt, setGoalAmt] = useState(0.0);
    const[budgetMonthlySavingGoal, setBudgetMonthlySavingGoal] = useState(0.0);
    const[SavedAmt, setSavedAmt] = useState(0.0);
    const[MonthlyExpenses, setMonthlyExpenses] = useState(0.0);

    //User ID BODY
    const [userId, setUserId] = useState(0);
    const [Password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    //transaction BODY
    const [transactionAmt, setTransactionAmt] = useState(0);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionID, setTransactionID] = useState(0);

    //achievement BODY
    const [achievementToAdd, setAchievementToAdd] = useState(0);
    
    //CRUD operations for Budget
    const createBudget = async() => {
        //create
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/add/667', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({MonthlyIncome,rent,utilities,groceries,insurance,phone,car,gas,fun,goal,GoalDescription,GoalAmt,SavedAmt,}),
            });

            const data = await response.json();
            console.log(data);
            hideBudgetPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const readBudget = async() => {
        //read
        try {
            const response = await fetch('https://www.fintech.davidumanzor.com/api/budgets/get/667', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            });
    
            const data = await response.json();
            console.log(data);
            console.log("UserIdRef:", data?.budgetGot?.UserIdRef);

            console.log("monthly income:", data?.budgetGot?.MonthlyIncome);
            setMonthlyIncome(data?.budgetGot?.MonthlyIncome);

            console.log("rent:", data?.budgetGot?.MonthlyExpenses?.rent);
            setRent(data?.budgetGot?.MonthlyExpenses?.rent)

            console.log("utilities:", data?.budgetGot?.MonthlyExpenses?.utilities);
            setUtilities(data?.budgetGot?.MonthlyExpenses?.utilities)

            console.log("groceries:", data?.budgetGot?.MonthlyExpenses?.groceries);
            setGroceries(data?.budgetGot?.MonthlyExpenses?.groceries)

            console.log("insurance:", data?.budgetGot?.MonthlyExpenses?.insurance);
            setInsurance(data?.budgetGot?.MonthlyExpenses?.insurance)

            console.log("phone:", data?.budgetGot?.MonthlyExpenses?.phone);
            setPhone(data?.budgetGot?.MonthlyExpenses?.phone)

            console.log("car:", data?.budgetGot?.MonthlyExpenses?.car);
            setCar(data?.budgetGot?.MonthlyExpenses?.car)

            console.log("gas:", data?.budgetGot?.MonthlyExpenses?.gas);
            setGas(data?.budgetGot?.MonthlyExpenses?.gas)

            console.log("fun:", data?.budgetGot?.MonthlyExpenses?.fun);
            setFun(data?.budgetGot?.MonthlyExpenses?.fun);

            console.log("goal:", data?.budgetGot?.MonthlyExpenses?.goal);
            setGoal(data?.budgetGot?.MonthlyExpenses?.goal);

            console.log("monthly expenses amount:", data?.budgetGot?.MonthlyExpensesAmt);
            setMonthlyExpenses(data?.budgetGot?.MonthlyExpensesAmt);

            console.log("goal description:", data?.budgetGot?.GoalDescription);
            setGoalDescription(data?.budgetGot?.GoalDescription);

            console.log("goal amount:", data?.budgetGot?.GoalAmt);
            setGoalAmt(data?.budgetGot?.GoalAmt);

            console.log("saved amount:", data?.budgetGot?.SavedAmt);
            setSavedAmt(data?.budgetGot?.SavedAmt);

            // hideBudgetPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const updateBudget = async() => {
        //update
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/edit/667', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({MonthlyIncome,rent,utilities,groceries,insurance,phone,car,gas,fun,goal,GoalDescription,GoalAmt,SavedAmt,}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBudgetPopup();
        } catch(error) {
            console.error("An error occured: ", error)
            console.log(getAccessToken());
        }
        };

    //CRUD for transactions
    const addTransaction = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/transactions/667', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({transactionAmt,transactionCategory}),
            });
            const data = await response.json();
            console.log(data);
            hideTransactionPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };
    const editTransaction = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/transactions/edit/667', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({transactionID, transactionAmt, transactionCategory,}),
            });
            const data = await response.json();
            console.log(data);
            hideTransactionPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };
    const getTransaction = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/transactions/get/667', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
            });
            const data = await response.json();
            console.log(data);
            hideTransactionPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };
    const deleteTransaction = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/budgets/transactions/delete/667', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({transactionID,}),
            });
            const data = await response.json();
            console.log(data);
            hideTransactionPopup();
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };
    
    const getAchievements = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/achievements/get/667', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
            });
            const data = await response.json();
            console.log(data);
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    const getAPIdashinfo = async() => {
        try {
            const response = await fetch('http://192.168.1.29:5000/api/info/667', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
            });
            const data = await response.json();
            console.log(data);
            } catch(error) {
                console.error("An error occured: ", error)
            }
        };

    useEffect(() => {
        readBudget();
        // getTransaction();
        }, []);


    // Sample data for the pie chart
    const pieChartData = [
        {
            key: 'expenses',
            value: 500,
            svg: { fill: '#FF6F61' },
            arc: { outerRadius: '100%', padAngle: 0.05 },
        },
        {
            key: 'savings',
            value: 300,
            svg: { fill: '#6EC1C2' },
            arc: { outerRadius: '90%', padAngle: 0.05 },
        },
        // Add more data segments as needed
    ];


    return (
        <View style={styles.container}>

            <LinearGradient colors={['#67286C','#973C9F']} style={styles.section1} start = {[0,0]} end = {[1,0]}>
            <Text style={styles.title}>FinTracker</Text>
            </LinearGradient>

            <LinearGradient colors={['#322133','#322133','#322133']} style={styles.section2}>
            </LinearGradient>

            
            <LinearGradient colors={['#67286C','#973C9F']} style={styles.section3} start = {[0,0]} end = {[1,0]}>
            <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>

            <View style={styles.mainSummaryBox}>

                <View style={styles.graphContainer}>
                <PieChart
                    style={{ height: 300 }}
                    data={pieChartData}
                />
                </View>
                
                    <Text style={styles.text}>Hello {firstName}!</Text>
                    <Text style={styles.monthlyIncomeText}>Monthly Income: ${parseFloat(MonthlyIncome).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Rent: ${parseFloat(rent).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Utilities: ${parseFloat(utilities).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Groceries: ${parseFloat(groceries).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Insurance Bills: ${parseFloat(insurance).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Phone: ${parseFloat(phone).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Gas: ${parseFloat(gas).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Entertainment: ${parseFloat(fun).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Income - Expenses: ${(parseFloat(MonthlyIncome) - parseFloat(MonthlyExpenses)).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Current Goal: {GoalDescription}</Text>
                    <Text style={styles.getStartedText}>Goal: ${parseFloat(GoalAmt).toFixed(2)}</Text>
                    <Text style={styles.getStartedText}>Saved Amount: ${parseFloat(SavedAmt).toFixed(2)}</Text>

                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Landing')}> 
                        <Text style={styles.getStartedText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainSummaryBox}>
                    <Text style={styles.text}>Transactions</Text>
                                        {/* Transaction info popup */}
                    <Modal
                    transparent={true}
                    visible={visibleTransactionPopup}>
                    <View style={{backgroundColor:"#000000aa",flex:1}}>
                        <View style={{backgroundColor:"#808080",margin:30,padding:40,borderRadius:10,flex:0.5, height:50, marginTop:150}}>

                            <Text style={styles.loginText}>Add Transaction</Text>

                            <TextInput
                            style={styles.input}
                            placeholder="Transaction Amount"
                            secureTextEntry = {false}
                            keyboardType='numeric'
                            onChangeText={text => {
                                const transactionAmtValue = parseInt(text,10);
                                setTransactionAmt(transactionAmtValue);
                            }}
                            />

                            <TextInput
                            style={styles.input}
                            placeholder="Transaction Category"
                            secureTextEntry = {false}
                            onChangeText={text => setTransactionCategory(text)}
                            />

                            <TextInput
                            style={styles.input}
                            placeholder="Transaction ID"
                            secureTextEntry = {false}
                            keyboardType='numeric'
                            onChangeText={text => {
                                const transactionIDValue = parseInt(text,10);
                                setTransactionID(transactionIDValue);
                            }}
                            />

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={addTransaction}
                            >
                            <Text style={styles.buttonText}>Create Transaction</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={hideTransactionPopup}
                            >
                            <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </Modal>
                    <TouchableOpacity
                                style={styles.getStartedButton}
                                onPress={showTransactionPopup}> 
                                <Text style={styles.getStartedText}>Add Transaction</Text>
                    </TouchableOpacity>


                    <View style={styles.textBox}>

                    </View>

                    <Text style={styles.text}>Achievements</Text>
                </View>

            </ScrollView>
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    graphContainer: {
        margin:10,
        borderRadius: 15,
        padding: 10,
        width:Dimensions.get('window').width,
    },
    textBox:{
        width:Dimensions.get('window').width,
        height:50,
        borderWidth:1,
        alignContent:'center',
        justifyContent:'center',
        padding:10,
        marginTop:10,
        alignSelf:"center",
    },
    section1:{
        flex:.7,
        backgroundColor:'lightblue',
        justifyContent: 'center'
    },
    section2:{
        flex:.1,
    },
    section3:{
        flex:4,
        alignContent:'center',
    },
    mainSummaryBox:{
        width:Dimensions.get('window').width,
        height:'100%',
        padding:10,
        alignItems:'center',
        backgroundColor:'#67286C',
        alignSelf:'center',
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
        marginBottom:5,
        fontSize:35,
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    loginText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:10,
        fontSize:35,
        color:'white',
        marginTop:-30,
        fontFamily: 'Montserrat-Black',
    },
    getStartedButton:{
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:140,
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
    monthlyIncomeText:{
        color:'white',
        fontSize:20,
        fontFamily: 'Montserrat-Black',
    },
    input: {
        width:200,
        height:30,
        borderColor:'white',
        borderWidth:1,
        marginBottom:10,
        paddingHorizontal:8,
        borderRadius:20,
        textAlign:'center',
        alignSelf:'center',
        color:'white',
        fontFamily: 'Montserrat-Black',
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
        fontFamily: 'Montserrat-Black',
    },
    button: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:120,
        marginBottom:10,
        alignSelf:'center',
    },
})
export default Dashboard;