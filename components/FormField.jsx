import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import defaultStyles from "../config/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
const FormField =({title,icon, value, placeholder, handleChangeText, otherStyles, ...props})=>{
    const [showPass, setshowPass]= useState(false)
    return(
        <View> 
       

        <View  style={styles.container}>
        {icon &&  <MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
            <TextInput  value={value} placeholder={placeholder} onChangeText={handleChangeText}
             secureTextEntry={title==="Password" && !showPass} style={styles.textInput}/>

            {title === "Password" && (
                <TouchableOpacity onPress={()=>setshowPass(!showPass)}>
                  <FontAwesome  style={styles.eye} name="eye" size={12} color="black" />
                </TouchableOpacity>
            )}
        </View>
        </View>
    )
}
const styles= StyleSheet.create({
   
    container:{
        backgroundColor: defaultStyles.colors.light,
        borderRadius:25,
        flexDirection:"row",
        width:"100%",
        padding:15,
        marginVertical:10,
    },
    textInput:{
      color:"#0c0c0c",
        fontSize:18,
        color: "black",
         backgroundColor: defaultStyles.colors.light,
         height:25,
         width:"80%"
         
    },
    icon:{
     marginLeft:10, 
     top:5
    },
    eye:{
        marginLeft:70,
        fontSize:18,
    }
})

export default FormField