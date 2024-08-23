import { View, Text, StyleSheet, Button,TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image'
import React from 'react'
import color from '../config/colors'
import AppText from './Apptext/AppText'
import AppButton from "../components/AppButton";
import { Link } from 'expo-router'


export default function Cards({item, router }, ) {


  return (
    <Link href={`Home/${item.title}`} asChild >
    <TouchableOpacity>

    <View style={styles.card}>
     <Image 
     width={Dimensions.get('window').width} 
    source={{uri:item.url}}/>
     <View  style={styles.detailsContainer}>
  
     <Text style={styles.title}>{item.title}</Text>
     <Text style={styles.subTitle} numberOfLines={3} ellipsizeMode='end'>{item.description}</Text>
     
     <TouchableOpacity >
    <View  style={styles.button} >
      <Link style={styles.text} href="/[id]">Read More</Link>
    </View>
    </TouchableOpacity>
     
     </View>
    </View>
    </TouchableOpacity>
   </Link>
  )
}
const styles= StyleSheet.create({

   text:{
    padding: 5,
    width: '30%',
    backgroundColor: "#3d015b" ,
      color: "white",
      fontSize: 12,
      paddingLeft:10,
      textTransform: 'uppercase',
      fontWeight:'bold',
      marginLeft:-7
   },
    card:{
        borderRadius: 15,
        backgroundColor: color.white,
        marginBottom:20,
        overflow:"hidden"
    },
    image:{
      width:"100%",
      height:200,
     
    },
    button:{
      margin:10,
      backgroundColor:"white"
    },
    detailsContainer:{
    padding:10,    
    },
    subTitle:{
    fontSize: 14,
    
    
     
    },
    title:{
      marginBottom:4,
      fontWeight:"bold",
      fontSize:20,
    }
    
})