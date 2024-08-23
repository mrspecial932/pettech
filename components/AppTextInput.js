import React from 'react';
import {View, TextInput, StyleSheet, Platform} from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons';
import icon from './icon';

import defaultStyles from "../config/styles";


function AppTextInput({icon, ...otherProps}) {
  return (
    <View style={styles.container}>
        {icon &&  <MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
        <TextInput styles={styles.textInput} {...otherProps}></TextInput>
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
        fontFamily: Platform.OS ==="andriod" ? 18:20,  
        color: "black",
         textTransform: "capitalize",
        
      
    },
    icon:{
     marginRight:10, 
    }
})


export default AppTextInput