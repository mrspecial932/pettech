import { Text, View, StyleSheet, Image, TextInput, Platform, Button, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import Cards from '../components/Cards';
import { Feather } from "@expo/vector-icons"

function Card(){
    return (
      <ScrollView>
      <View style={styles.Top}>
        <View style={styles.Status}>
          <View style={styles.WElstatus} >
          <Text style={styles.Welcome}> Hello <Text style={{fontWeight:"bold"}}>Elisha</Text></Text>
          <Text style={styles.weltext}> welcome to PetTech</Text>
          </View>
          <Image style={styles.image} source={require("../assets/mosh.jpg")}></Image>
            <View style={styles.textContainer}>
           <TextInput style={styles.textInput} placeholder='search' />
           
           <Feather style={styles.search} name="search"  size={25}></Feather>
         
           </View>
        </View>
        
      <View style={{backgroundColor:'#e8e3e3',
      borderRadius:30,
      padding:20, top:180, paddingTop:50}}>
      
       </View>
      
      </View>
      </ScrollView>
    )
  }

  const styles= StyleSheet.create({
    textInput:{
      color:"black",
      fontSize:14,
      height:50,
      
      padding:10,
      fontFamily: Platform.OS==="android" ? "Roboto":"Avenir"
    },
    search:{
     left:270,
     top:12,
    },
    textContainer:{
      backgroundColor:"white",
      borderRadius:10,
      flexDirection:"row",
      top:120,
    },
    Top: {
        paddingTop: Constants.statusBarHeight
    },
    WElstatus:{
      flex:1,
      width:500,
      position:'absolute',
      top: 50,
      left:10
    },
    Status:{
      position:'absolute',
      backgroundColor:"#3d015b",
      height:300,
      width:"100%",
      padding:10,
 
    },
    image:{
      height:30,
      width:30,
      position:'absolute',
      top:50,
      left:330,
      borderRadius:50,
    },
    Welcome: {
      color:"white",
      fontSize:20,
    
      
    },
    weltext:{
      color:"white",
      
    }

})

export default Card