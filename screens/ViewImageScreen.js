import React from 'react'
import { Image, View , StyleSheet } from 'react-native'
import color from '../config/color'
import AppText from '../components/Apptext/AppText'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import AppButton from '../components/AppButton'


export default function ViewImageScreen() {
  return (
 <View style= {{flex:1,
    justifyContent:'center', 
   alignItems:"center",
   alignContent:"center",
  
  }}>
   
   
    <AppText style={{marginBottom:"20"}}> Theabbey</AppText>

    <AppButton title="login" onPress={()=>console.log("tapped")}/>
  
 </View>
  
 )
}
