import { Text, View, StyleSheet, Image, TextInput, Platform, Button, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import React from 'react'
import Screen from "../components/Screen"
import Icon from "../components/icon";
import Listitem from '../components/Listitem';

export default  function Settings () {
  return (

    <ScrollView>
      <View style={styles.Top}>
        <View style={styles.Status}>
        <Image style={styles.image} source={require("../assets/mosh.jpg")}></Image>
          
          <View style={styles.WElstatus} >
          <Text style={styles.Welcome}>  <Text style={{fontWeight:"bold"}}>Olawale Elisha</Text></Text>
          <Text style={styles.weltext}> welcome to PetTech</Text>
          </View>
           </View>
        </View>
      
    <Screen>
        <Listitem title= "Home"
        ImageComponent={<Icon name="home"/>}
        ></Listitem>
          <Listitem title= "Laguage"
        ImageComponent={<Icon name="email"/>}
        ></Listitem>
        <Listitem title= "Logout"
        ImageComponent={<Icon name="logout"/>}
        ></Listitem>
    </Screen>
    </ScrollView>
  )
}
const styles= StyleSheet.create({

  WElstatus:{
   
  },
  Status:{
    backgroundColor:"#3d015b",
    height:200,
    width:"100%",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:80,
    width:80,
    borderRadius:50,
  },
  Welcome: {
    color:"white",
    fontSize:30,
  
    
  },
  weltext:{
    color:"white",
    left:10,
  }

})
