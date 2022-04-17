import React, { Component, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { TextInput, Button, Subheading } from "react-native-paper";
  import RegisterScreen from './RegisterScreen';


  const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <View style={{margin: 16}}>
        <TextInput
          label="Email"
          style={{ marginTop: 12 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          style={{ marginTop: 12 }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <View style={{flexDirection: "column", marginTop: 16}}>
          <Button mode="contained" onPress={() => ({})} color="#6745b5">
            Log in
          </Button> 
        </View>

        <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Do not have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("mainTabScreen", {screen: 'RegisterStackScreen'}) /* BUG: Navigation part does not work properly*/ }><Text style={styles.signupButton}> Register</Text></TouchableOpacity>
          
        </View>
      </View>
      );
  }

  const styles = StyleSheet.create({
    signupTextCont : {
      flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical: 16,
      flexDirection:'row'
    },
    signupText: {
      fontSize:16,
    },
    signupButton: {
      color:'#f199a8',
      fontSize:16,
      fontWeight:'500'
    },
  });




  export default LoginScreen;