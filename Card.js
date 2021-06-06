import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {WebView} from 'react-native-webview'
import { Avatar,Card,Title,Paragraph,Icon} from 'react-native-paper'
import { StyleSheet, Text, View ,Image,Button,ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Subtitle } from 'native-base';
import Modal from 'react-native-modal'

export default class card extends React.Component{
   state={
       modalvisibility:false,
   }
    render()
    {
        return(
        <View style={{flex:1}}>
      
             <Card style={styles.c} onPress={()=>{this.setState({
              modalvisibility:true   
             })}}>
            
             <Card.Title left={()=><Image style={{marginRight:10,height:50,width:50,borderRadius:60}} source={{uri:this.props.ic!=null?this.props.ic :"https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }}/>}/>
               <Card.Content >
                <Title >{this.props.da}</Title>
                 
               <Text>{this.props.ti}</Text>
               </Card.Content>
                <Modal isVisible={this.state.modalvisibility} style={{flex:1}}>
                <View style={{backgroundColor:"rgba( 47, 79, 79, 0.9 )" ,height:"50%" ,flex:1}} >
                <WebView style={{flex:1,height:100}} source={{uri:this.props.url}} allowsInlineMediaPlayback={false}/>
                <Button title="Close" 
                onPress={()=>{this.setState({modalvisibility:false})}} />
                </View>
                </Modal>
             </Card>
        </View>
              )
    }
}
const styles= StyleSheet.create({
    c:{
        borderRadius:5,
        margin:7,
        borderColor:"black",
        backgroundColor:'#5f9ea0',
        flexDirection:"row"
    }
})