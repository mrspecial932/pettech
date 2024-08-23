import { Text, View, StyleSheet, Image, TextInput, Platform, Button, ScrollView, ImageComponent } from 'react-native'
import Constants from 'expo-constants';
import React from 'react'
import Screen from "../components/Screen"
import Icon from "../components/icon";
import AppText from './Apptext/AppText';


export default function Listitem({title, ImageComponent}) {
  return (
    <View style={Styles.container}>
        {ImageComponent}
        <View style={Styles.DetailContainer}>
       <AppText style={Styles.title}>{title}</AppText>
       </View>
    </View>
  )
}
const Styles = StyleSheet.create({
    container :{
        flexDirection: "row",
        padding:15,
    },
    DetailContainer:{
        marginLeft:10,
        justifyContent:"center",
    }


})  
