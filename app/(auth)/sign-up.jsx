import { StyleSheet, View , Image,Text, Alert} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField"
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import colors from "../../config/colors";
import { createUser } from "../../lib/appwrite";


const SignUp =()=>{

    const [form, setForm]= useState({username :"",email:"", password:""})
    const [isSubmitting, setisSubmitting]= useState(false)
   
    const submit = async ()=>{
      if(!form.username || !form.email || !form.password){
        Alert.alert("error", "please fill in all the form")
      }
      setisSubmitting(true)

      try{
        const result = await createUser(form.email, form.password, form.username)
         router.replace('/Home')
      }catch(error){
        Alert.alert("Error", error.message)
      }finally{
        setisSubmitting(true)
      }
    }
    
    return(
      <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo-red.png")} />
        <Text style={styles.tagline}>PetsTech</Text>
      </View>
      <FormField title= "name" value={form.username} 
      handleChangeText={(e)=>setForm({...form, username:e})}
      keyboardType="name"  icon="account" placeholder="name"
      />
      <FormField title= "Email" value={form.email} 
      handleChangeText={(e)=>setForm({...form, email:e})}
        icon="email" placeholder="email"
      />
      <FormField title= "Password" value={form.password} 
      handleChangeText={(e)=>setForm({...form, password:e})}
      keyboardType="email-address"  icon="lock" placeholder="password"
      />
            <Link href="/Home">
<CustomButton title="Sign Up" handlePress={submit} isLoading={isSubmitting}></CustomButton>
</Link>
<View style={styles.content}>
  <Text style={styles.text}> Have Account already ? <Link href="/sign-in" style={styles.link} >Login</Link></Text>
  
</View>
      </View>
    )
}



const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        backgroundColor:"#0f0f31",
        justifyContent: "center",
        padding:15,
        
      },
      tagline:{
        fontSize:50,
        fontWeight:"800",
        paddingVertical:15,
        color:"#fff"
      },
      logo: {
        width: 100,
        height: 100,
        marginBottom:"",
      },
      logoContainer: {
        
        alignItems: "center",
      },
      text:{
        color: "white"
      },
      link:{
        color: "yellow"
      },
      content: {
        
        alignItems: "center",
      },

    });
    
export default SignUp