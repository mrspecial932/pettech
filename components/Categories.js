import {View, Text, FlatList, StyleSheet, Pressable} from "react-native"
import React from "react"
import { useRouter } from "expo-router";
import useAppwrite from "../lib/useAppwrite";
import { useState } from "react";
import { getAllPosts } from "../lib/appwrite";

const Categories= ()=>{
    const {data:posts}=useAppwrite(getAllPosts);
    const router =  useRouter()
    const [refreshing, setRefreshing]= useState(false);
    const onRefresh= async()=>{
      setRefreshing(true);
      setRefreshing(false);
    }
  
    
     
    return(
        <FlatList data={posts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=>item.$id}
          renderItem={({item, index})=>(
            <View style={{}}>
                <text>{item.category}</text>
        </View>
        )}
        />

            
                
  


    
)}

const styles = StyleSheet.create({
   flatlistContainer:{
    backgroundColor: "white",
    padding:10,
    gap:8,
    color:"black"
   }
})
export default Categories