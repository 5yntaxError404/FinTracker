import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
//screens
import Login from './screens/Login'
import Landing from './screens/Landing'
import Dashboard from './screens/Dashboard'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { YellowBox } from 'react-native';

// Ignore specific deprecation warnings by their message content
YellowBox.ignoreWarnings([
  'ViewPropTypes will be removed from React Native',
  // Add other warning messages here if needed
]);

// AppRegistry registration and other code...

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
