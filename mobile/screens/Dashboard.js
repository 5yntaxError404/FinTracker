import React, {useState, useEffect,useReducer  } from 'react';
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

    const [visibleIncomePopup, setVisibleIncomePopup] = useState(false);
    const showIncomePopup = () => setVisibleIncomePopup(true);
    const hideIncomePopup = () => setVisibleIncomePopup(false);

    const [visibleExpensePopup, setVisibleExpensePopup] = useState(false);
    const showExpensePopup = () => setVisibleExpensePopup(true);
    const hideExpensePopup = () => setVisibleExpensePopup(false);

    const [visibleCategoryBreakdownPopup, setVisibleCategoryBreakdownPopup] = useState(false);
    const showCategoryBreakdownPopup = () => setVisibleCategoryBreakdownPopup(true);
    const hideCategoryBreakdownPopup = () => setVisibleCategoryBreakdownPopup(false);

    // Budget BODY
    const[MonthlyIncome, setMonthlyIncome] = useState(1);
    const[rent, setRent] = useState(0);
    const[utilities, setUtilities] = useState(0);
    const[groceries, setGroceries] = useState(0);
    const[insurance, setInsurance] = useState(0);
    const[phone, setPhone] = useState(0);
    const[car, setCar] = useState(0);
    const[gas, setGas] = useState(0);
    const[fun, setFun] = useState(0);
    const[goal, setGoal] = useState(0);
    const[GoalDescription, setGoalDescription] = useState('');
    const[GoalAmt, setGoalAmt] = useState(0);
    const[budgetMonthlySavingGoal, setBudgetMonthlySavingGoal] = useState(0);
    const[SavedAmt, setSavedAmt] = useState(0.0);
    const[MonthlyExpenses, setMonthlyExpenses] = useState(0);

    //transaction BODY
    const [transactionAmt, setTransactionAmt] = useState(0);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionID, setTransactionID] = useState(0);

    //achievement BODY
    const [achievementToAdd, setAchievementToAdd] = useState(0);
    const [userId, setUserId] = useState("");

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
            // setMonthlyExpenses(data?.budgetGot?.MonthlyExpensesAmt);
            setMonthlyExpenses(rent+utilities+groceries+insurance+phone+car+gas+fun+goal);
            console.log("setMonthlyExpenses which is now: " + MonthlyExpenses);
            // addDataPoint("MonthlyExpensesAmt",MonthlyExpensesAmt);

            console.log("goal description:", data?.budgetGot?.GoalDescription);
            setGoalDescription(data?.budgetGot?.GoalDescription);

            console.log("goal amount:", data?.budgetGot?.GoalAmt);
            setGoalAmt(data?.budgetGot?.GoalAmt);
            // addDataPoint("GoalAmt",GoalAmt);

            console.log("saved amount:", data?.budgetGot?.SavedAmt);
            setSavedAmt(data?.budgetGot?.SavedAmt);
            // addDataPoint("SavedAmt",SavedAmt);

            addDataPoint("MonthlyIncome", (MonthlyIncome/MonthlyIncome)*100);
            addDataPoint("MonthlyExpensesAmt",(MonthlyExpenses/MonthlyIncome)* 100);
            // addDataPoint("rent",(rent/MonthlyIncome)* 100);
            // addDataPoint("utilities",(utilities/MonthlyIncome)* 100);
            // addDataPoint("groceries",(groceries/MonthlyIncome)* 100);
            // addDataPoint("insurance",(insurance/MonthlyIncome)* 100);
            // addDataPoint("phone",(phone/MonthlyIncome)* 100);
            // addDataPoint("car",(car/MonthlyIncome)* 100);
            // addDataPoint("gas",(gas/MonthlyIncome)* 100);
            // addDataPoint("fun",(fun/MonthlyIncome)* 100);
            // addDataPoint("goal",(goal/MonthlyIncome)* 100);
            


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
            const response = await fetch('http://www.fintech.davidumanzor.com/api/budgets/transactions/667', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({transactionAmt,transactionCategory}),
            });
            const data = await response.json();
            console.log(data);
            dynamicTransactionData.push({[transactionCategory]:transactionAmt});
            console.log(dynamicTransactionData);
            addDataPoint("Transaction,",transactionAmt/MonthlyIncome*100);
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
            const response = await fetch('http://www.fintech.davidumanzor.com/api/budgets/transactions/get/667', {
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

    let dynamicTransactionData = [
    ]

    const clearData = () => {
            setData([{ key: 1, value: 0.1, svg: { fill: 'white' } }]);
        };

    // function parseJwt(token) {
    //     const base64Url = token.split('.')[1];
    //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     const jsonPayload = decodeURIComponent(
    //         atob(base64)
    //         .split('')
    //         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    //         .join('')
    //     );
    //     return JSON.parse(jsonPayload);
    //     }

        const [, forceUpdate] = useReducer((x) => x + 1, 0);

        useEffect(() => {
          const fetchData = async () => {
            // parseJwt(getAccessToken);
            clearData();
            await readAllValues();
            await readBudget();
            await readAllValues();
            // await getTransaction();
            await forceUpdate(); // Manually trigger re-render
          };
        
          fetchData();
        }, []);

    // function initiateGraph(){
    //     if(MonthlyIncome>1)
    //     {
    //         setGraphColor("green");
    //         hideIncomePopup();
    //     }
    // }

    const [data, setData] = useState([
        { key: 1, value: 0.01, svg: { fill: 'white' } }
      ]);

    const addDataPoint = (name, cost) => {
        let color = "white"
        console.log("name is: " + name);
        if(name === "MonthlyExpensesAmt")
        {
            color = "red";
        }
        else if(name === "MonthlyIncome")
        {
            color = `green`;
        }
        else
        {
            color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
            console.log("name is " + name );
        }
        console.log("cost: " + cost + " color: " + color);
        setData(prevData => {
          const newDataPoint = {
            key: prevData.length + 1,
            value: cost,
            // svg: { fill: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)` },
            svg:{fill:color},
            name: name,
          };
      
          return [...prevData, newDataPoint];
        });
      };

      // Function to read all values
    const readAllValues = () => {
        data.forEach(item => {
        console.log(`Key: ${item.key}, Value: ${item.value}, Fill: ${item.svg.fill}`);
        });
    };

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
                    {/* <PieChart
                        style={{ height: 300 }}
                        data={pieChartDataInitial}
                    /> */}

                    <PieChart
                        style={{ height: 300 }}
                        data={data}
                        innerRadius={'40%'}
                        outerRadius={'80%'}
                        labelRadius={'75%'}
                    />
                </View>

                <Modal
                    transparent={true}
                    visible={visibleIncomePopup}>
                    <View style={{backgroundColor:"#000000aa",flex:1}}>
                        <View style={{backgroundColor:"#808080",margin:30,padding:40,borderRadius:10,flex:0.5, height:50, marginTop:150,}}>

                            <Text style={styles.loginText}>Set Monthly Income</Text>

                            <TextInput
                            style={styles.input}
                            placeholder="Monthly Income"
                            secureTextEntry = {false}
                            keyboardType='numeric'
                            onChangeText={text => {
                                const monthlyIncomeValue = parseInt(text,10);
                                setMonthlyIncome(monthlyIncomeValue)
                            }}
                            />

                            <TouchableOpacity 
                                style={styles.button}
                                // onPress={() => initiateGraph()}
                            >
                            <Text style={styles.buttonText}>Set Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={hideIncomePopup}
                            >
                            <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                                style={styles.getStartedButton}
                                onPress={showIncomePopup}> 
                                <Text style={styles.getStartedText}>Set Income</Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={visibleExpensePopup}>
                    <View style={{backgroundColor:"#000000aa",flex:1}}>
                        <View style={{backgroundColor:"#808080",margin:20,padding:40,borderRadius:10,flex:0.9, height:50, marginTop:55}}>

                            <Text style={styles.loginText}>Add Expenses</Text>

                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Rent"
                            secureTextEntry = {false}
                            onChangeText={text => setRent(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Utilities"
                            secureTextEntry = {false}
                            onChangeText={text => setUtilities(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Groceries"
                            secureTextEntry = {false}
                            onChangeText={text => setGroceries(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Insurance"
                            secureTextEntry = {false}
                            onChangeText={text => setInsurance(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Phone"
                            secureTextEntry = {false}
                            onChangeText={text => setPhone(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Car"
                            secureTextEntry = {false}
                            onChangeText={text => setCar(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Gas"
                            secureTextEntry = {false}
                            onChangeText={text => setGas(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Entertainment"
                            secureTextEntry = {false}
                            onChangeText={text => setFun(text)}
                            />
                            <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="Goal"
                            secureTextEntry = {false}
                            onChangeText={text => setGoal(text)}
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => listExpenses()}
                            >
                            <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={hideExpensePopup}
                            >
                            <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                                style={styles.getStartedButton}
                                onPress={showExpensePopup}> 
                                <Text style={styles.getStartedText}>Set Budget</Text>
                </TouchableOpacity>

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
       
                <Modal
                    transparent={true}
                    visible={visibleCategoryBreakdownPopup}>
                    <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>

                            
                                <View style={styles.categoryBreakdownContainer}>
                                    <Text style={styles.categoryBreakdownTitle}>Rent</Text>
                                    
                                    {/* <PieChart
                                        style={{ height: 300 }}
                                        data={pieChartDataInitial}
                                    /> */}
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>
                            
                                <View style={styles.categoryBreakdownContainer}>
                                    <Text style={styles.categoryBreakdownTitle}>Utilities</Text>
                                    
                                    {/* <PieChart
                                        style={{ height: 300 }}
                                        data={pieChartDataInitial}
                                    /> */}
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                    </ScrollView>
                </Modal>
                <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={showCategoryBreakdownPopup}> 
                        <Text style={styles.getStartedText}>Category Breakdown</Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Landing')}> 
                        <Text style={styles.getStartedText}>Log Out</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.mainSummaryBox}>
                <Text style={styles.text}>Budget Goal</Text>
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
        height: 300,
        alignContent:'center',
        borderRadius: 15,
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
    categoryBreakdownContainer: {
        justifyContent:'center',
        alignContent:'center',
        flex:1,
        width:Dimensions.get('window').width,
        backgroundColor:"#808080",
    },
    categoryBreakdownTitle:{
        fontSize:30,
        color:'white',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
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
        width:200,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        fontFamily: 'Montserrat-Black',
        margin:10,
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
    categoryButtonText:{
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    categoryButton: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:200,
        margin:20,
        alignSelf:'center',
    },
    button: {
        borderRadius:20,
        padding:8,
        alignItems:'center',
        backgroundColor:'purple',
        borderWidth:1,
        width:200,
        marginBottom:10,
        alignSelf:'center',
    },
})
export default Dashboard;