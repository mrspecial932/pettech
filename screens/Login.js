import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import * as Yup from 'yup';
import {AppForm, APPformfield,SubmitButton} from "../components/Form"

const validationSchema= Yup.object().shape({
    email : Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password")
});

export default function Login() {
    
 
  return (
    
       <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>PetsTech</Text>
      </View>

      <View style={styles.form}>
       <AppForm initialValues={{email :'', password: ''}}
        onSubmit={values=> console.log(values)}
        validationSchema={validationSchema}
        >
                    
                    
                    <APPformfield
        autoCapitalize="none"
        icon="email"
        name="email"
        placeholder="email"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress" 
        />
       
  
        
  
        <APPformfield autoCapitalize="none"
        autoCorrect={false}
        icon="lock"
        name="password"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        />
          
  
        <SubmitButton title="Login"/>
        </AppForm>
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
});
