import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Button,ScrollView,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {} from 'react-navigation-material-bottom-tabs'
import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tab1 from './Tabcomponent/Tab1'
import tab2 from './Tabcomponent/Tab2'
import Car from './Card'
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Input, Label} from 'native-base';
<MaterialCommunityIcons name="settings" size={24} color="black" />
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator } from "react-navigation"
import { Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
 class Home extends React.Component {
   state={
    dataloaded:false,
    listdata:[],
  }
  registertoken= async ()=>{
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
     let finalstatus=status;
     if(status!=='granted')
     {
       console.log("No")
       const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
       finalstatus=status;
     }
     if(finalstatus!=='granted')
     {
       return;
     }
     else{
         console.log("fuck")
         Notifications.getExpoPushTokenAsync().then((token)=>{console.log(token)}).catch((error)=>{console.log(error)});
         
     }
   

  } 
  
 componentDidMount()
 {
  this.registertoken();
   fetch("http://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=b21b899fac094c23931985d22ffb5140").then(data=>data.json()).then(data2=>{this.setState({
     dataloaded:true,
     listdata:data2.articles
   })
  }
  )
 }
 Hello=()=>
 {
  return  (  
     <ScrollView>
    {this.state.listdata.map((data)=>{
     return(
     <View>
     <Car da={data.title} ic={data.urlToImage} ti={data.publishedAt} des={data.description} url={data.url}/>
     </View>
     )
  }
  )}
  </ScrollView>
  )
 }
static navigationOptions={
  drawerLabel:'Home',
  drawerIcon:()=>(
    <AntDesign name="home" size={24} color="black"/>
  )
}
  render()
{
  return (
    <View style={styles.container}>
    { 
     this.Hello()
    }
    </View>
  );
}
}
const Tabn= createMaterialBottomTabNavigator({
     General:{screen:Home,navigationOptions:{activeColor:"white",tabBarLabel:"Genreal",inactiveColor:"white",tabBarIcon:()=>(
       <Ionicons name="md-people" size={24} color="white" />
     ),barStyle:{backgroundColor:"#2f4f4f"}} },
     Entertainment:{screen:tab1,navigationOptions:{activeColor:"white",inactiveColor:"white",tabBarIcon:()=>(
      <Fontisto name="smiley" size={24} color="white" />
     ),barStyle:{backgroundColor:"#2f4f4f"}} },
     Business:{screen:tab2,navigationOptions:{activeColor:"white",inactiveColor:"white",tabBarIcon:()=>(
       <FontAwesome name="money" size={24} color="white" />
     ),barStyle:{backgroundColor:"#2f4f4f"}} }
 }

 )
 export default createAppContainer(Tabn);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
