import { StyleSheet, Text, View } from "react-native";
import {Slot, Stack} from 'expo-router'
import GlobalProvider from "../context/GlobalProvide";
import { LanguageProvider } from "../context/languagecontext";

const RootLayout = ()=>{
  return (
    <GlobalProvider>
      <LanguageProvider>
    <Stack>
      <Stack.Screen name="index" options={{headerShown : false}}/>
      <Stack.Screen name="(auth)" options={{headerShown : false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown : false}}/>
    
    </Stack>
    </LanguageProvider>
    </GlobalProvider>
)
}
export default RootLayout