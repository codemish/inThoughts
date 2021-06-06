import { StatusBar } from 'expo-status-bar';
import React from 'react';
import sign from './Signin'
import { ImageBackground, StyleSheet, Text, View ,Image ,TouchableHighlight,TouchableOpacity,TextInput} from 'react-native';
import * as firebase from 'firebase'
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, DrawerItems , createStackNavigator, SafeAreaView,drawerIcon} from "react-navigation"
import Second from './Signin'
import {AppLoading} from 'expo'
import {Font} from 'expo'
import { useFonts,
  DrSugiyama_400Regular 
} from '@expo-google-fonts/dr-sugiyama'
import * as Google from 'expo-google-app-auth';
import {Button} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
 class Firstpage extends React.Component
{
  state={
        email:"",
        password:""
    } 
    componentDidMount(){
      this.checkifloggedin()
    }
     isUserEqual=(googleUser, firebaseUser)=> {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }

  return false;
}
checkifloggedin=()=>{
  firebase.default.auth().onAuthStateChanged(
    (user)=>{
      if(user)
      {
        this.props.navigation.navigate("Home")
      }
      else{
        this.props.navigation.navigate("First")
      }
    }
  )
}
     onSignIn=(googleUser)=> {
 
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
         googleUser.idToken,
         googleUser.accessToken
        );

      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).then(()=>{console.log("user Signed in")}).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }).bind(this);
}
   
        signInWithGoogleAsync=async()=>{
  try {
    const result = await Google.logInAsync({
      behavior:"web",
      androidClientId: "292930517769-3i9kk6ja4el640ks7qfffpa1k1ue4eet.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      this.onSignIn(result)
      console.log("Success")
      return (this.props.navigation.navigate("Home"),result.accessToken);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e)
    return { error: true };
  }
}

      signup=()=>
    {
      firebase.default.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{this.props.navigation.navigate('Home')}).catch(err=>{console.log(err)})
    }
    render()
    {
        return(
                <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email:text })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
        onChangeText={(text)=>{this.setState({password:text})}}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766"  onPress={()=>{this.signup()}}/>
        <View>
        <Text> Already have an account?
         <Text onPress={() => {this.props.navigation.navigate("Second")}} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
       <Button icon={<AntDesign name="google" size={24} color="black" /> } onPress={()=>{this.signInWithGoogleAsync()}} title="Sign in with Google"/>
              </View>
      //  <View>
      //  <ImageBackground source={require('./image/Leaves.jpg')}  style={{width:"100%",height:"100%"}}>
      //   <View>
      //  <Text style={{fontSize:40,alignSelf:"center",alignItems:"center",marginTop:"20%",fontStyle:"italic",fontWeight:"bold",color:"white"}}>Hello User</Text>
      //    <Text style={{backgroundColor:"#5f9ea0",fontSize:30,alignSelf:"center",alignItems:"center",marginTop:"10%",fontStyle:"italic",fontWeight:"bold",color:"white"}}>
      //  WELCOME to InTHOUGHTS
      //  </Text>
      //  </View>
       
      //  <Text style={{borderWidth:2,borderRadius:15,padding:5,fontSize:20,alignSelf:"center",alignItems:"center",marginTop:"40%",fontFamily:"sans-serif",fontWeight:"bold",color:"white"}}>
      //    Before Moving in, Kindly
      //  </Text>
      //  <TouchableOpacity onPress={()=>this.props.navigation.navigate("Second")}>
      //  <Text style={{backgroundColor:"black",fontSize:20,alignSelf:"center",alignItems:"center",marginTop:"10%",fontFamily:"sans-serif",fontWeight:"bold",color:"white"}}>Login/Signup</Text>
      //  </TouchableOpacity>
      //  </ImageBackground>
      //  </View> 
        )
    }
}
const stack2= createStackNavigator({
  First:Firstpage,
  Second:sign,
},{
    defaultNavigationOptions:{
   header:null,
    }})
export default createAppContainer(stack2)
const styles= StyleSheet.create({
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