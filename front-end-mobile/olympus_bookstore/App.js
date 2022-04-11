import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-ionicons';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import BasketScreen from './screens/BasketScreen';
import LoginScreen from './screens/LoginScreen';
import MainTabScreen from './screens/mainTabsScreen';



/*const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
} */

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
/*
const TabsNavigator = () => (
  <Tabs.Navigator> 
    <Tabs.Screen name = "Olympus" component={HomeScreen} />
    <Tabs.Screen name = "BasketScreen" component={BasketScreen} />
    <Tabs.Screen name = "FavoritesScreen" component={FavoritesScreen} />
    <Tabs.Screen name = "LoginScreen" component={LoginScreen} />
  </Tabs.Navigator>

); */

/*function TabsNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Settings" component={LoginScreen} />
    </Tabs.Navigator>
  );
} */



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabScreen} options = { {headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
