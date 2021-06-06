import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as firebase from 'firebase'
export default class logout extends React.Component{
    
render()
{
    logout=()=>{
        console.log(props)
        firebase.default.auth().signOut().then(()=>{this.props.navigation.navigate("First")}).catch(()=>{alert("Sorry,Something went wrong")})
    }
    return(
        <View>
       <Text onPress={()=>{this.logout()}}>LOGOUT</Text>
        </View>
    )
}    
}