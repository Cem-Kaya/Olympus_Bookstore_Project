import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import BasketScreen from './BasketScreen';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Tabs = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackScreen = () => (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {color: 'white'}}}>
        <Stack.Screen name="Olympus Bookstore" component={HomeScreen} options = {{headerStyle: {backgroundColor: '#282c35'}}} /> 
    </Stack.Navigator>  
); /* dynamic app bar header change is needed*/

const BasketStackScreen = () => (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {color: 'white'}}}>
        <Stack.Screen name="My Basket" component={BasketScreen} options = {{headerStyle: {backgroundColor: '#282c35'}}} /> 
    </Stack.Navigator>  
); 

const FavoritesStackScreen = () => (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {color: 'white'}}}>
        <Stack.Screen name="My Favorites" component={FavoritesScreen} options = {{headerStyle: {backgroundColor: '#282c35'}}} /> 
    </Stack.Navigator>  
); 

const LoginStackScreen = () => (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {color: 'white'}}}>
        <Stack.Screen name="Log In" component={LoginScreen} options = {{headerStyle: {backgroundColor: '#282c35'}}} />
    </Stack.Navigator>  
);

const RegisterStackScreen = () => (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {color: 'white'}}}>
        <Stack.Screen name="Register" component={RegisterScreen} options = {{headerStyle: {backgroundColor: '#282c35'}}} />
    </Stack.Navigator>  
);

const MainTabScreen = () => (
    <Tabs.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
    >
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#282c35',
          tabBarIcon: ({ color }) => (
            <Icon name="home-variant" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="Basket"
        component={BasketStackScreen}
        options={{
          tabBarLabel: 'Basket',
          tabBarColor: '#282c35',
          tabBarIcon: ({ color }) => (
            <Icon name="basket" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesStackScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarColor: '#282c35',
          tabBarIcon: ({ color }) => (
            <Icon name="star" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={LoginStackScreen} /* BUG: Navigation part does not work properly*/
        //component={RegisterStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#282c35',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tabs.Navigator>
);

export default MainTabScreen;