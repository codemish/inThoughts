import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View ,Image,TextInput,Button } from 'react-native';
import * as firebase from 'firebase'
import {AppLoading} from 'expo'
import {Font} from 'expo'
import { useFonts,
  DrSugiyama_400Regular 
} from '@expo-google-fonts/dr-sugiyama'
export default class Signin extends React.Component{
    state={
        email:"",
        password:""
    } 
    signin=()=>
    {
      firebase.default.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{this.props.navigation.navigate('Home')}).catch(err=>{console.log(err)})
    }
    render(){
    return (
        <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
      
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={()=>{this.signin()}} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('First')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>  

    // <View>
    //  <ImageBackground source={{uri:"https://imgur.com/a/lZFFKtc"}} style={{width:"100%",height:"100%"}}>   
    //  <View> 
    // <TextInput label="Email"  placeholder="Email" onChangeText={(text)=>{this.setState({Email:text})}} />
    // <TextInput label="Password" placeholder="Passwod" onChangeText={(text)=>{this.setState({Password:text})}} />
    // <Button mode="contained" text="signup"   onPress={()=>{this.signup()}} />
    // <Button mode="contained"  onPress={()=>{this.signin()}} />
  
    // </View>
    // </ImageBackground>
    // </View> 
    )
 }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    fontSize:20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15
  }
})