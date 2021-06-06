import React from 'react';
import { StyleSheet, Text, View,Button,Image, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="settings" size={24} color="black" />
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, DrawerItems , createStackNavigator, SafeAreaView,drawerIcon, createSwitchNavigator} from "react-navigation"
//import SettingsScreen from './Settingsscreen'

import Signin from './Signin'
import HomeScreen from './Homescreen'
import first from './firstpage'
import * as firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons'; 
import {firebaseConfig} from './configure';
import { Content } from 'native-base';
import { exp } from 'react-native-reanimated';
import Tabn from './Settingsscreen'
import logout from './Logout'
import { TouchableHighlight } from 'react-native-gesture-handler';
if (!firebase.apps.length) {
 firebase.default.initializeApp(firebaseConfig);
}
const CustomDrawerComponent=(props)=>(
  <SafeAreaView>
  <View style={{height:150,backgroundColor:'white',justifyContent:"center",marginTop:"20%"}}>
   {retrieve()}
  <TouchableHighlight onPress={()=>{props.navigation.navigate('Home')}}>
  <Image source={{uri:photoUrl!=null?photoUrl:"https://i1.wp.com/www.medianama.com/wp-content/uploads/Facebook-shadow.jpg?resize=640%2C403&"}} style={{ height:90,width:90,borderRadius:70,alignSelf:"center",flexDirection:"column"}}/>
  </TouchableHighlight>
  <Text style={{fontSize:20,alignSelf:"center"}}>
   Hello  
   <Text style={{fontStyle:"italic",color:"#2f4f4f",padding:6}}> {name}</Text>
  </Text>
   <DrawerItems {...props} style={{marginTop:"20%"}}/>
  </View>
  </SafeAreaView>
)
var name, email, photoUrl, uid, emailVerified;

var retrieve=()=>{
var user = firebase.auth().currentUser;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
             // you have one. Use User.getToken() instead.
}
else{
  photoUrl="";
}
}
const DrawerNavigator = createDrawerNavigator
(
  {
    Home: {screen:HomeScreen, navigationOptions:{ drawerIcon:()=>(
       <AntDesign name="home" size={24} color="black"/>
    ), title:"Home" }},
    Logout: { screen: Tabn, navigationOptions:{drawerIcon:()=>(
      <MaterialCommunityIcons name="settings" size={24} color="black" />
    ),headerTitleStyle:{
      fontWeight:"bold"
    }}},  
  },
    {
      contentComponent:CustomDrawerComponent
    } 
  )
  const Stackcontainer= createStackNavigator({
  Dhome:DrawerNavigator
  },
  {
      defaultNavigationOptions:(props)=>{
      return {
      title:'InThoughts',
       headerLeft: <Entypo style={{marginLeft:15}} name="menu" size={35} color="black" onPress={()=>{props.navigation.toggleDrawer()}} />,
       headerStyle:{
       height:50,
       backgroundColor:"#2f4f4f",
     },
      headerTintColor:"#fff",
      headerTitleStyle:{
      fontWeight:'bold',
      fontSize:30
     },}
   },
  }
);
const Stack3= createStackNavigator({
    First:first
},
{defaultNavigationOptions:{
   title:'InThoughts',
   headerStyle:{
       height:50,
       backgroundColor:"#2f4f4f",
     },
       headerTintColor:"#fff",
      headerTitleStyle:{
      fontWeight:'bold',
      fontSize:30
     }
}})
const switch1= createSwitchNavigator({
  one:Stack3,
  two:Stackcontainer
})
export default createAppContainer(switch1);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
