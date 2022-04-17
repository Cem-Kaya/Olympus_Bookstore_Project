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

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import BasketScreen from './screens/BasketScreen';
import LoginScreen from './screens/LoginScreen';
import MainTabScreen from './screens/mainTabsScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

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
