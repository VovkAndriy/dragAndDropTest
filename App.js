import React from 'react';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainScreen } from './src/MainScreen';
import { Table } from './src/TableScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Table' component={Table} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
