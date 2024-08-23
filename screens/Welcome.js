import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "../components/AppButton";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>PetsTech</Text>
      </View>

      <View style={styles.buttonContainer}>
      <AppButton title="Login"/>
      <AppButton title="Registration" color="secondary"/>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
 
  background: {
    flex: 1,
    backgroundColor:"#0f0f31",
    justifyContent: "flex-end",
    alignItems: "center",
    
  },
  buttonContainer:{
    padding:20,
    marginBottom:70,
    width:"100%"
  },
  tagline:{
    fontSize:50,
    fontWeight:"600",
    paddingVertical:20,
    color:"#fff"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 200,
    alignItems: "center",
  },
});

export default WelcomeScreen;
