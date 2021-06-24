import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Game from './pages/Game'
import Home from './pages/Home'
import Finish from './pages/Finish'
import store from './store'
import { Provider } from 'react-redux';

const Stack = createStackNavigator()

export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Game" component={Game}></Stack.Screen>
          <Stack.Screen name="Finish" component={Finish}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home}></Stack.Screen>
    //     <Stack.Screen name="Game" component={Game}></Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}
