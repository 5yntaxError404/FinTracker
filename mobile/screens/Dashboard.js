import React, {useState, useEffect,useReducer  } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Modal, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { getAccessToken, getUserId } from '../accessToken';
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
    const[MonthlyIncome, setMonthlyIncome] = useState(1.00);
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

    //transaction BODY
    const [transactionAmt, setTransactionAmt] = useState(0.0);
    const [transactionCategory, setTransactionCategory] = useState('');
    const [transactionID, setTransactionID] = useState(0);

    //achievement BODY
    const [achievementToAdd, setAchievementToAdd] = useState(0);
    let userId = "";

    const [visible, setVisible] = useState(false);

    //CRUD operations for Budget
    const createBudget = async() => {
        //create
        try {
            
            const response = await fetch(`https://www.fintech.davidumanzor.com/api/budgets/add/${getUserId()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: JSON.stringify({
                MonthlyIncome: parseFloat(MonthlyIncome),
                rent: parseFloat(rent),
                utilities: parseFloat(utilities),
                groceries: parseFloat(groceries),
                insurance: parseFloat(insurance),
                phone: parseFloat(phone),
                car: parseFloat(car),
                gas: parseFloat(gas),
                fun: parseFloat(fun),
                goal: parseFloat(goal),
                GoalDescription: GoalDescription,
                GoalAmt:parseFloat(GoalAmt),
                SavedAmt:parseFloat(SavedAmt),
            }),
            });

            const data = await response.json();
            console.log(data);
            clearData();
            readBudget();
            setVisible(true);
            hideExpensePopup();
        } catch(error) {
            console.error("An error occurred: ", error);
            console.error("Error message: ", error.message);
            console.error("Error stack: ", error.stack);
            console.error("Response status: ", error?.response?.status);
            console.error("Response data: ", error?.response?.data);
            console.log(MonthlyIncome);
            console.log(rent);
            console.log(utilities);
            console.log(groceries);
            console.log(insurance);
            console.log(phone);
            console.log(car);
            console.log(gas);
            console.log(fun);
            console.log(goal);
            console.log(GoalDescription);
            console.log(GoalAmt);
            console.log(SavedAmt);
            console.log(getAccessToken());

        }
        };

    const readBudget = async() => {
        //read
        try {
            const response = await fetch(`https://www.fintech.davidumanzor.com/api/budgets/get/${getUserId()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();

            // console.log("monthly income:", data?.budgetGot?.MonthlyIncome);
            setMonthlyIncome(parseFloat(data?.budgetGot?.MonthlyIncome));
            

            // console.log("rent:", data?.budgetGot?.MonthlyExpenses?.rent);
            setRent(parseFloat(data?.budgetGot?.MonthlyExpenses?.rent))


            // console.log("utilities:", data?.budgetGot?.MonthlyExpenses?.utilities);
            setUtilities(parseFloat(data?.budgetGot?.MonthlyExpenses?.utilities))

            
            // console.log("groceries:", data?.budgetGot?.MonthlyExpenses?.groceries);
            setGroceries(parseFloat(data?.budgetGot?.MonthlyExpenses?.groceries))


            // console.log("insurance:", data?.budgetGot?.MonthlyExpenses?.insurance);
            setInsurance(parseFloat(data?.budgetGot?.MonthlyExpenses?.insurance))


            // console.log("phone:", data?.budgetGot?.MonthlyExpenses?.phone);
            setPhone(parseFloat(data?.budgetGot?.MonthlyExpenses?.phone))


            // console.log("car:", data?.budgetGot?.MonthlyExpenses?.car);
            setCar(parseFloat(data?.budgetGot?.MonthlyExpenses?.car))


            // console.log("gas:", data?.budgetGot?.MonthlyExpenses?.gas);
            setGas(parseFloat(data?.budgetGot?.MonthlyExpenses?.gas))


            // console.log("fun:", data?.budgetGot?.MonthlyExpenses?.fun);
            setFun(parseFloat(data?.budgetGot?.MonthlyExpenses?.fun));


            // console.log("goal:", data?.budgetGot?.MonthlyExpenses?.goal);
            setGoal(parseFloat(data?.budgetGot?.MonthlyExpenses?.goal));

            console.log("monthly expenses amount:", parseFloat(data?.budgetGot?.MonthlyExpensesAmt));
            setMonthlyExpenses(parseFloat(data?.budgetGot?.MonthlyExpensesAmt));

            setTransactionAmt(parseFloat(data?.budgetGot?.TransactionsAmt));
            console.log("this is your transaction amount: " + transactionAmt);

            // console.log("goal description:", data?.budgetGot?.GoalDescription);
            setGoalDescription(data?.budgetGot?.GoalDescription);

            // console.log("goal amount:", data?.budgetGot?.GoalAmt);
            setGoalAmt(data?.budgetGot?.GoalAmt);

            // console.log("saved amount:", data?.budgetGot?.SavedAmt);
            setSavedAmt(data?.budgetGot?.SavedAmt);

            // updateChartData("rent","rent",(rent/MonthlyIncome)* 100);
            // hideBudgetPopup();
        } catch(error) {
            console.error("An error occured: ", error)
        }
        };

        const [firstEffectRun, setFirstEffectRun] = useState(false);

        useEffect(() => {
            if(MonthlyExpenses != 0)
            {
                // console.log("");
                // console.log("setMonthlyExpenses percentage which is now: ", + (MonthlyExpenses/MonthlyIncome)* 100);
                // console.log("MonthlyIncome percentage which is now: " + 100 - (MonthlyExpenses/MonthlyIncome) * 100);
                console.log(MonthlyIncome);
                console.log("Monthly Expenses: " + MonthlyExpenses);
                updateChartData("main","MonthlyIncome", 100 - (MonthlyExpenses/MonthlyIncome)* 100);
                updateChartData("main","MonthlyExpensesAmt",(MonthlyExpenses/MonthlyIncome)* 100);
                // readAllValues();
                setFirstEffectRun(true);
                setVisible(true);
            }
        }, [MonthlyExpenses]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if(GoalAmt != 0 && SavedAmt != 0)
            {
                // console.log("");
                // console.log("setMonthlyExpenses percentage which is now: ", + (MonthlyExpenses/MonthlyIncome)* 100);
                // console.log("MonthlyIncome percentage which is now: " + 100 - (MonthlyExpenses/MonthlyIncome) * 100);
                console.log("Goal: " + GoalAmt);
                console.log("Saved: " + SavedAmt)
                updateChartData("budget","goalAmt", 100 - (SavedAmt/GoalAmt)* 100);
                updateChartData("budget","saved",(SavedAmt/GoalAmt)* 100);
            }
        }, [GoalAmt, SavedAmt]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            console.log("we are under the rent part, MonthlyExpenses is: " + MonthlyExpenses + " Boolean is: " + firstEffectRun);
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("rent", "MonthlyExpensesAmt", 100 - (rent / MonthlyExpenses) * 100);
                updateChartData("rent", "rent", (rent / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [rent, firstEffectRun]);

        useEffect(() => {
            console.log("we are under the transaction part, MonthlyExpenses is: " + MonthlyExpenses + " Boolean is: " + firstEffectRun);
            console.log(transactionAmt);
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("transaction", "MonthlyExpensesAmt", 100 - (transactionAmt / MonthlyExpenses) * 100);
                updateChartData("transaction", "transaction", (transactionAmt / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [transactionAmt, firstEffectRun]);

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("utilities", "MonthlyExpensesAmt", 100 - (utilities / MonthlyExpenses) * 100);
                updateChartData("utilities", "utilities", (utilities / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [utilities, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("groceries", "MonthlyExpensesAmt", 100 - (groceries / MonthlyExpenses) * 100);
                updateChartData("groceries", "groceries", (groceries / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [groceries, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("insurance", "MonthlyExpensesAmt", 100 - (insurance / MonthlyExpenses) * 100);
                updateChartData("insurance", "insurance", (insurance / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [insurance, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("phone", "MonthlyExpensesAmt", 100 - (phone / MonthlyExpenses) * 100);
                updateChartData("phone", "phone", (phone / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [phone, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("car", "MonthlyExpensesAmt", 100 - (car / MonthlyExpenses) * 100);
                updateChartData("car", "car", (car / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [car, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("gas", "MonthlyExpensesAmt", 100 - (gas / MonthlyExpenses) * 100);
                updateChartData("gas", "gas", (gas / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [gas, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("fun", "MonthlyExpensesAmt", 100 - (fun / MonthlyExpenses) * 100);
                updateChartData("fun", "fun", (fun / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [fun, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes

        useEffect(() => {
            if (firstEffectRun && MonthlyExpenses !== 0) {
                updateChartData("goal", "MonthlyExpensesAmt", 100 - (fun / MonthlyExpenses) * 100);
                updateChartData("goal", "goal", (goal / MonthlyExpenses) * 100);
            }
            // readAllValues();
        }, [goal, firstEffectRun]); // This will trigger the effect whenever MonthlyExpenses changes


    const updateBudget = async() => {
        //update
        try {
            const response = await fetch(`https://www.fintech.davidumanzor.com/api/budgets/edit/${getUserId()}`, {
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
    const addTransaction = async () => {
        try {
            // Get the user ID from the login
            const userId = getUserId();
    
            // Make the POST request to add a transaction
            const response = await fetch(`http://www.fintech.davidumanzor.com/api/budgets/transactions/${getUserId()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({
                    transactionAmt,
                    transactionCategory
                }),
            });
    
            // Check if the response status is OK (2xx)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Parse the response data
            const data = await response.json();
            console.log(data);
    
            // Update dynamicTransactionData
            dynamicTransactionData.push({
                [transactionCategory]: transactionAmt
            });
            console.log(dynamicTransactionData);
            hideTransactionPopup();
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };
      
    const editTransaction = async() => {
        try {
            const userId = getUserId();
            const response = await fetch(`https://fintech.davidumanzor.com/api/budgets/transactions/edit/${getUserId()}`, {
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
            const userId = getUserId();
            const response = await fetch(`https://www.fintech.davidumanzor.com/api/budgets/transactions/get/${getUserId()}`, {
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
            const userId = getUserId();
            const response = await fetch(`https://fintech.davidumanzor.com/api/budgets/transactions/delete/${getUserId()}`, {
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
            const userId = getUserId();
            const response = await fetch(`https://fintech.davidumanzor.com/api/achievements/get/${getUserId()}`, {
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
            const userId = getUserId();
            const response = await fetch(`https://fintech.davidumanzor.com/api/info/${getUserId()}`, {
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

    const clearData = () => {
            setData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setRentData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setUtilitiesData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setGroceriesData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setInsuranceData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setPhoneData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setCarData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setGasData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setFunData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setGoalData([{ key: 1, value: 0.01, svg: { fill: 'white' } }]);
            setMonthlyExpenses(0.0);
            setMonthlyIncome(1.00);
        };

        const [, forceUpdate] = useReducer((x) => x + 1, 0);

        useEffect(() => {
          const fetchData = async () => {
            // parseJwt(getAccessToken);
            userId = getUserId();
            console.log("this is your userId " + userId);
            // clearData();
            await readBudget();
            // await getTransaction();
            // await forceUpdate(); // Manually trigger re-render
          };
        
          fetchData();
        }, []);

    const [data, setData] = useState([
        { key: 1, value: 0.01, svg: { fill: 'white' } }
      ]);

    
    const [rentData, setRentData] = useState([
        { key: 1, value: 0.01, svg: { fill: 'white' } },
      ]);

    const [utilitiesData, setUtilitiesData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [groceriesData, setGroceriesData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [insuranceData, setInsuranceData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [phoneData, setPhoneData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [carData, setCarData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [gasData, setGasData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [funData, setFunData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [goalData, setGoalData] = useState([
    { key: 1, value: 0.01, svg: { fill: 'white' } }
    ]);

    const [transactionData, setTransactionData] = useState([
        { key: 1, value: 0.01, svg: { fill: 'white' } }
        ]);

    const [budgetGoalData, setBudgetGoalData] = useState([
        { key: 1, value: 0.01, svg: { fill: 'white' } }
        ]);

    // const addDataPoint = (name, cost) => {
    //     let color = "white"
    //     console.log("name is: " + name);
    //     if(name === "MonthlyExpensesAmtPercentage")
    //     {
    //         color = "red";
    //     }
    //     else if(name === "MonthlyIncomePercentage")
    //     {
    //         color = `green`;
    //     }
    //     else
    //     {
    //         color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
    //         console.log("name is " + name );
    //     }
    //     console.log("cost: " + cost + " color: " + color);
    //     setData(prevData => {
    //       const newDataPoint = {
    //         key: prevData.length + 1,
    //         value: cost,
    //         svg:{fill:color},
    //         name: name,
    //       };
      
    //       return [...prevData, newDataPoint];
    //     });
    //   };

      // Function to read all values
    
    
    
      const readAllValues = () => {
        data.forEach(item => {
        console.log(`Key: ${item.key}, Value: ${item.value}, Fill: ${item.svg.fill}`);
        });
    };

    const updateChartData = (chartType, name, cost) => {
        if(name === "MonthlyExpensesAmt")
        {
            color = "red";
        }
        else if(name === "MonthlyIncome")
        {
            color = `green`;
        }
        else if(name === "rent")
        {
            color = "blue";
        }
        else if(name === "utilities")
        {
            color = "yellow";
        }
        else if(name === "groceries")
        {
            color = "purple";
        }
        else if(name === "insurance")
        {
            color = "orange";
        }
        else if(name === "phone")
        {
            color = "pink";
        }
        else if(name === "car")
        {
            color = "#5A2E07";
        }
        else if(name === "gas")
        {
            color = "cyan";
        }
        else if(name === "fun")
        {
            color = "#2E5984";
        }
        else if(name === "goal")
        {
            color = "#FF8C00";
        }
        else if(name === "transaction")
        {
            color = "#8B4513";
        }
        else if(name === "goalAmt")
        {
            color = "red";
        }
        else if(name === "saved")
        {
            color = "green";
        }
      
        const newDataPoint = {
          key: Math.random(), // You can generate a unique key based on your requirements
          value: cost,
          svg: { fill: color },
          name: name,
        };

        console.log("This is the chart: " + chartType);
        console.log("This is the name: " + name);
        console.log("This is the cost: " + cost);
        console.log(" ");
        switch (chartType) {
            case "main":
            setData((prevData) => [...prevData, newDataPoint]);
            break;
            case "rent":
            setRentData((prevRentData) => [...prevRentData, newDataPoint]);
            break;
            case "utilities":
            setUtilitiesData((prevUtilitiesData) => [...prevUtilitiesData, newDataPoint]);
            break;
            case "groceries":
            setGroceriesData((prevGroceriesData) => [...prevGroceriesData, newDataPoint]);
            break;
            case "insurance":
            setInsuranceData((prevInsuranceData) => [...prevInsuranceData, newDataPoint]);
            break;
            case "phone":
            setPhoneData((prevPhoneData) => [...prevPhoneData, newDataPoint]);
            break;
            case "car":
            setCarData((prevCarData) => [...prevCarData, newDataPoint]);
            break;
            case "gas":
            setGasData((prevGasData) => [...prevGasData, newDataPoint]);
            break;
            case "fun":
            setFunData((prevFunData) => [...prevFunData, newDataPoint]);
            break;
            case "goal":
            setGoalData((prevGoalData) => [...prevGoalData, newDataPoint]);
            break;
            case "budget":
            setBudgetGoalData((prevBudgetGoalData) => [...prevBudgetGoalData, newDataPoint]);
            break;
            case "transaction":
            setTransactionData((prevTransactionData) => [...prevTransactionData, newDataPoint]);
            break;
            // Add more cases for other chart types as needed
            default:
            break;
        }
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
                    <PieChart
                        style={{ height: 300 }}
                        data={data}
                        innerRadius={'40%'}
                        outerRadius={'80%'}
                        labelRadius={'75%'}
                    />
                </View>

                {visible && (
                <Text style={styles.monthlyIncomeTextDash}>Monthly Income is : {MonthlyIncome}</Text>
                )}

                {visible && (
                <Text style={styles.monthlyExpenseText}>Monthly Expense is : {MonthlyExpenses}</Text>
                )}

                <Modal
                    transparent={true}
                    visible={visibleExpensePopup}>
                    <View style={{backgroundColor:"#613659",flex:1}}>
                        <View style={{backgroundColor:"#613659",margin:0,padding:0,borderRadius:0,flex:1, height:50, marginTop:10}}>

                            <Text style={styles.BudgetText}>Edit Budget</Text>
                            <TextInput
                            style={styles.firstinput}
                            keyboardType='numeric'
                            placeholder="Monthly Income"
                            secureTextEntry = {false}
                            onChangeText={text => setMonthlyIncome(text)}
                            />

                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Rent"
                            secureTextEntry = {false}
                            onChangeText={text => setRent(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Utilities"
                            secureTextEntry = {false}
                            onChangeText={text => setUtilities(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Groceries"
                            secureTextEntry = {false}
                            onChangeText={text => setGroceries(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Insurance"
                            secureTextEntry = {false}
                            onChangeText={text => setInsurance(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Phone"
                            secureTextEntry = {false}
                            onChangeText={text => setPhone(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Car"
                            secureTextEntry = {false}
                            onChangeText={text => setCar(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Gas"
                            secureTextEntry = {false}
                            onChangeText={text => setGas(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Entertainment"
                            secureTextEntry = {false}
                            onChangeText={text => setFun(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Goal"
                            secureTextEntry = {false}
                            onChangeText={text => setGoal(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            placeholder="Goal Description"
                            secureTextEntry = {false}
                            onChangeText={text => setGoalDescription(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Goal Amount"
                            secureTextEntry = {false}
                            onChangeText={text => setGoalAmt(text)}
                            />
                            <TextInput
                            style={styles.inputBudget}
                            keyboardType='numeric'
                            placeholder="Saved Amount"
                            secureTextEntry = {false}
                            onChangeText={text => setSavedAmt(text)}
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => createBudget()}
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
                        <View style={{backgroundColor:"#613659",margin:30,padding:40,borderRadius:10,flex:0.5, height:50, marginTop:150}}>

                            <Text style={styles.addTransactionText}>Add Transaction</Text>

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
                                onPress={() => addTransaction()}
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

                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.rent}>Rent : ${rent}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={rentData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    // onPress={() => readAllValues()}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>

                                    
                                </View>
                            
                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.utilities}>Utilities : ${utilities}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={utilitiesData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.groceries}>Groceries : ${groceries}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={groceriesData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.insurance}>Insurance : ${insurance}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={insuranceData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.phone}>Phone : ${phone}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={phoneData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.car}>Car : ${car}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={carData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.gas}>Gas : ${gas}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={gasData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.fun}>Entertainment : ${fun}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={funData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.goal}>Goal : ${goal}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={goalData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>

                                {transactionAmt !== 0 && (
                                <View style={styles.categoryBreakdownContainer}>
                                    {MonthlyExpenses !== 1 && (
                                    <Text style={styles.expense}>Total Expense is : ${parseFloat(MonthlyExpenses.toFixed(2))}</Text>
                                    )}
                                    <Text style={styles.transaction}>Transactions : ${transactionAmt}</Text>
                                    
                                    <PieChart
                                    style={{ height: 300 }}
                                    data={transactionData}
                                    innerRadius={'40%'}
                                    outerRadius={'80%'}
                                    labelRadius={'75%'}
                                    />
                                    
                                    <TouchableOpacity 
                                    style={styles.categoryButton}
                                    onPress={hideCategoryBreakdownPopup}
                                    >
                                    <Text style={styles.buttonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>
                                )}

                    </ScrollView>
                </Modal>
                <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={showCategoryBreakdownPopup}> 
                        <Text style={styles.getStartedText}>Expenses Breakdown</Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('Landing')}> 
                        <Text style={styles.getStartedText}>Log Out</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.mainSummaryBox}>
                <Text style={styles.text}>{GoalDescription}</Text>
                <Text style={styles.expense}>{SavedAmt}/{GoalAmt}</Text>
                <View style={styles.graphContainer}>
                    <PieChart
                        style={{ height: 300 }}
                        data={budgetGoalData}
                        innerRadius={'40%'}
                        outerRadius={'80%'}
                        labelRadius={'75%'}
                    />
                </View>
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
        backgroundColor:"#613659",
    },
    expense:{
        fontSize:30,
        color:'red',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    rent:{
        fontSize:30,
        color:'blue',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    utilities:{
        fontSize:30,
        color:'yellow',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    groceries:{
        fontSize:30,
        color:'purple',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    insurance:{
        fontSize:30,
        color:'orange',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    phone:{
        fontSize:30,
        color:'pink',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    car:{
        fontSize:30,
        color:'#5A2E07',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    gas:{
        fontSize:30,
        color:'cyan',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    fun:{
        fontSize:30,
        color:'#2E5984',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    goal:{
        fontSize:30,
        color:'#FF8C00',
        fontFamily: 'Montserrat-Black',
        alignSelf:'center'
    },
    transaction:{
        fontSize:30,
        color:'#8B4513',
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
    BudgetText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginTop:80,
        fontSize:35,
        color:'white',
        fontFamily: 'Montserrat-Black',
    },
    monthlyIncomeTextDash:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:5,
        fontSize:20,
        color:'green',
        fontFamily: 'Montserrat-Black',
    },
    monthlyExpenseText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:5,
        fontSize:20,
        color:'red',
        fontFamily: 'Montserrat-Black',
    },
    loginText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:40,
        fontSize:35,
        color:'white',
        marginTop:-40,
        fontFamily: 'Montserrat-Black',
    },
    addTransactionText:{
        marginLeft:1,
        marginRight:1,
        textAlign:'center',
        marginBottom:20,
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
    inputBudget: {
        width:200,
        height:20,
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
    firstinput: {
        width:200,
        height:20,
        borderColor:'white',
        borderWidth:1,
        marginTop:10,
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
    incomeText:{
        color:'green',
        fontFamily: 'Montserrat-Black',
    },
    expenseText:{
        color:'red',
        fontFamily: 'Montserrat-Black',
    },
    rentText:{
        color:'blue',
        fontFamily: 'Montserrat-Black',
    },
    utilitiesText:{
        color:'yellow',
        fontFamily: 'Montserrat-Black',
    },
    groceriesText:{
        color:'purple',
        fontFamily: 'Montserrat-Black',
    },
    insuranceText:{
        color:'"orange";',
        fontFamily: 'Montserrat-Black',
    },
    phoneText:{
        color:'"pink";',
        fontFamily: 'Montserrat-Black',
    },
    carText:{
        color:"#5A2E07",
        fontFamily: 'Montserrat-Black',
    },
    gasText:{
        color:'"cyan";',
        fontFamily: 'Montserrat-Black',
    },
    funText:{
        color:'#4682B4',
        fontFamily: 'Montserrat-Black',
    },
    goalText:{
        color:'#FF8C00',
        fontFamily: 'Montserrat-Black',
    },
    transactionText:{
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