import React, {useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
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

    const [visibleTransactionPopup, setVisibleTransactionPopup] = useState(false);
    const showTransactionPopup = () => setVisibleTransactionPopup(true);
    const hideTransactionPopup = () => setVisibleTransactionPopup(false);

    // Budget BODY
    const[MonthlyIncome, setMonthlyIncome] = useState(0);
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
    const[SavedAmt, setSavedAmt] = useState(0);
    const[MonthlyExpenses, setMonthlyExpenses] = useState(0);

    // Bank Account BODY
    const [AccountNum, setAccountNumber] = useState('');
    const oldAccountNum = AccountNum;
    const [RouteNum, setRouteNumber] = useState('');
    const [BankName, setBankName] = useState('');

    const [newAccountNum, setNewAccountNumber] = useState('');
    const [newRouteNum, setNewRouteNumber] = useState('');
    const [newBankName, setNewBankName] = useState('');

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
    
    //delete bank account
    const deleteBankAccount = async() => {
    
        try {
            const response = await fetch('http://192.168.1.29:5000/api/accounts/delete', {
                method: 'DELETE',
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

    //Edit and Delete User
    const editUser = async() => {
        //update
        try {
            const response = await fetch('http://192.168.1.29:5000/api/users/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({Password}),
            });
    
            const data = await response.json();
            console.log(data);
            hideBankPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

    const deleteUser = async() => {
        //delete
        try {
            const response = await fetch('http://192.168.1.29:5000/api/users/delete', {
                method: 'DELETE',
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
        }, []);

    return (
        <View style={styles.container}>

            <LinearGradient colors={['#67286C','#973C9F']} style={styles.section1} start = {[0,0]} end = {[1,0]}>
            <Text style={styles.title}>FinTracker</Text>
            </LinearGradient>

            <LinearGradient colors={['#211522','#211522','#211522']} style={styles.section2}>
            </LinearGradient>

            
            <LinearGradient colors={['#67286C','#973C9F']} style={styles.section3} start = {[0,0]} end = {[1,0]}>
            <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>

                <View style={styles.mainSummaryBox}>
                    <Text style={styles.text}>Hello {}!</Text>
                    <Text style={styles.getStartedText}>Monthly Income: {MonthlyIncome}</Text>
                    <Text style={styles.getStartedText}>Rent: {rent}</Text>
                    <Text style={styles.getStartedText}>Utilities: {utilities}</Text>
                    <Text style={styles.getStartedText}>Groceries: {groceries}</Text>
                    <Text style={styles.getStartedText}>Insurance Bills: {insurance}</Text>
                    <Text style={styles.getStartedText}>Phone: {phone}</Text>
                    <Text style={styles.getStartedText}>Gas: {gas}</Text>
                    <Text style={styles.getStartedText}>Fun: {fun}</Text>
                    {/* <Text style={styles.getStartedText}>Budget Monthly Goal: {budgetMonthlySavingGoal}</Text> */}
                    <Text style={styles.getStartedText}> enter graph here</Text>

                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Landing')}> 
                        <Text style={styles.getStartedText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainSummaryBox}>
                    <Text style={styles.text}>Transactions</Text>
                    <Text style={styles.text}>Achievements</Text>
                </View>

            </ScrollView>
            </LinearGradient>
            
            
        </View>
        );

}
            
            {/* Bank info popup */}
            {/* <Modal
            transparent={true}
            visible={visibleBankPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:30,padding:40,borderRadius:10,flex:1,}}>

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
            </Modal> */}

            {/* Budget info popup */}
            {/* <Modal
            transparent={true}
            visible={visibleBudgetPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:20,padding:40,borderRadius:10,flex:1,}}>

                    <Text style={styles.loginText}>Budget CRUD</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Monthly Income"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const incomeValue = parseInt(text,10);
                        setMonthlyIncome(incomeValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Rent"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const rentValue = parseInt(text,10);
                        setRent(rentValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Utilities"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const utilitiesValue = parseInt(text,10);
                        setUtilities(utilitiesValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Groceries"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const groceriesValue = parseInt(text,10);
                        setGroceries(groceriesValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Insurance"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const insuranceValue = parseInt(text,10);
                        setInsurance(insuranceValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const phoneValue = parseInt(text,10);
                        setPhone(phoneValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Car"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const carValue = parseInt(text,10);
                        setCar(carValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Gas"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const gasValue = parseInt(text,10);
                        setGas(gasValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Fun"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const funValue = parseInt(text,10);
                        setFun(funValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Goal"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const goalValue = parseInt(text,10);
                        setGoal(goalValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Goal Description"
                    secureTextEntry = {false}
                    onChangeText={text => setGoalDescription(text)}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Goal Amount"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const goalAmountValue = parseInt(text,10);
                        setGoalAmt(goalAmountValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Saved Amount"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const savedAmtValue = parseInt(text,10);
                        setSavedAmt(savedAmtValue);
                    }}
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={createBudget}
                    >
                    <Text style={styles.buttonText}>Create Budget</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={readBudget}
                    >
                    <Text style={styles.buttonText}>Read Budget</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={updateBudget}
                    >
                    <Text style={styles.buttonText}>Update Budget</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={hideBudgetPopup}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </Modal> */}
            
            {/* Transaction info popup */}
            {/* <Modal
            transparent={true}
            visible={visibleTransactionPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:30,padding:40,borderRadius:10,flex:1,}}>

                    <Text style={styles.loginText}>Transaction Crud</Text>

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
                        onPress={editTransaction}
                    >
                    <Text style={styles.buttonText}>Edit Transaction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={deleteTransaction}
                    >
                    <Text style={styles.buttonText}>Delete Transaction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={hideTransactionPopup}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </Modal> */}

            {/* User info popup */}
            {/* <Modal
            transparent={true}
            visible={visibleAccountPopup}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
                <View style={{backgroundColor:"#808080",margin:30,padding:40,borderRadius:10,flex:1,}}>

                    <Text style={styles.loginText}>User Edit and Delete</Text>

                    <TextInput
                    style={styles.input}
                    placeholder="User ID"
                    secureTextEntry = {false}
                    keyboardType='numeric'
                    onChangeText={text => {
                        const transactionAmtValue = parseInt(text,10);
                        setTransactionAmt(transactionAmtValue);
                    }}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry = {true}
                    onChangeText={text => setTransactionCategory(text)}
                    />

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={editUser}
                    >
                    <Text style={styles.buttonText}>Edit User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={deleteUser}
                    >
                    <Text style={styles.buttonText}>Delete User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={hideAccountPopup}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </Modal> */}

            {/* show banking detail CRUD popup*/}
            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBankPopup}
                        >
                            <Text style={{color:'white'}}>Banking Details</Text>    
            </TouchableOpacity> */}

            {/* show budget CRUD popup */}
            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showBudgetPopup}
                        >
                            <Text style={{color:'white'}}>Budget</Text>    
            </TouchableOpacity> */}

            {/* edit and delete main account info */}
            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showAccountPopup}
                        >
                            <Text style={{color:'white'}}>Account Info</Text>    
            </TouchableOpacity> */}

            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={showTransactionPopup}
                        >
                            <Text style={{color:'white'}}>Transactions</Text>    
            </TouchableOpacity> */}

            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={getAchievements}
                        >
                            <Text style={{color:'white'}}>Get Achievements</Text>    
            </TouchableOpacity> */}

            {/* <TouchableOpacity
                            style={styles.transactionButton}
                            onPress={getAPIdashinfo}
                        >
                            <Text style={{color:'white'}}>API dash info</Text>    
            </TouchableOpacity> */}

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


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
    },
    section1:{
        flex:.7,
        justifyContent: 'center',
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
        // alignContent:'center',
        // justifyContent:'center',
        alignSelf:'center',
    },
    budgetSummaryBox:{
        width:300,
        height:250,
        borderRadius:20,
        padding:10,
        alignItems:'center',
        backgroundColor:'#67286C',
        borderWidth:1,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:10,
    },
    AchievementBox:{
        width:300,
        height:250,
        borderRadius:20,
        padding:10,
        alignItems:'center',
        backgroundColor:'#67286C',
        borderWidth:1,
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:10,
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
        fontSize:35,
        color:'white',
    },
    loginText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:10,
        fontSize:35,
        color:'white',
        marginTop:-30,
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
        width:140,
        height:30,
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
        width:120,
        marginBottom:10,
        alignSelf:'center',
    },
})

export default Dashboard;