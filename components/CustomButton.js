import { TouchableOpacity, Text , StyleSheet, View} from "react-native";
import React from "react"
import colors from "../config/colors";
const CustomButton = ({title , handlePress,  isLoading}) => {
    return (
        <View style={styles.button}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} disabled={isLoading}>
        <Text style={styles.text}> {title}</Text>
        </TouchableOpacity>
        </View>
    )
}
export default CustomButton

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
