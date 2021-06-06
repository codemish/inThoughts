import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tab1 from './Tabcomponent/Tab1'
import Tab2 from './Tabcomponent/Tab2'
import Home from './Homescreen'
import * as firebase from "firebase"
<MaterialCommunityIcons name="settings" size={24} color="black" />
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation"
 class SettingsScreen extends React.Component {
   logout=()=>{
        console.log("props")
        firebase.default.auth().signOut().then(()=>{this.props.navigation.navigate("First")}).catch(()=>{alert("Sorry,Something went wrong")})
    }
  render() {
    
    return(
        <View>
       <Text onPress={this.logout()}>LOGOUT</Text>
        </View>
    );
  }
  
}
 const Tabn= createBottomTabNavigator({
     Tab1:SettingsScreen,
     Tab2:Tab2,
 },
 )

 export default createAppContainer(Tabn)