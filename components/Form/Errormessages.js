import React from 'react'
import { StyleSheet, Text } from 'react-native'
import AppText from "../Apptext/AppText"

export default function Errormessages({error, visible}) {
    if (!visible || !error) return null
  return (
  <Text style={styles.background}>{error}</Text>
  )
}
const styles = StyleSheet.create({
    
  background: {
      backgroundColor:"#0f0f31",
      color:"red",
      left: 15,
      fontSize:12,
    },
  })  