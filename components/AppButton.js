import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from "../config/colors"

function AppButton({title,onPress, color="primary" }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
    <View >
      <Text style={styles.text}>{title}</Text>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button :{
     backgroundColor: "#3a58f6" ,
     borderRadius: 25,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 15,
     width: '100%',
     marginVertical:10,
    },
    text:{
       color: colors.white,
       fontSize: 18,
       textTransform: 'uppercase',
       fontWeight:'bold'
    }
})
export default AppButton;