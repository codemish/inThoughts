import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Button,ScrollView,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Car from '../Card'
import { Container, Header, Content, Form, Item, Input, Label} from 'native-base';
<MaterialCommunityIcons name="settings" size={24} color="black" />
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation"
 export default class tab2 extends React.Component {
   state={
    dataloaded:false,
    listdata:[]
  }
 componentDidMount()
 {
   fetch("http://newsapi.org/v2/top-headlines?country=in&category=Business&apiKey=b21b899fac094c23931985d22ffb5140").then(data=>data.json()).then(data2=>{this.setState({
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

  render()
{
  return (
    <View style={styles.container}>
    { 
      this.state.dataloaded?this.Hello():<ActivityIndicator/>
    }
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
