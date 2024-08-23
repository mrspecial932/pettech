import { View, Text } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function icon({name, size=40, backgroundColor="#000", iconColor="#fff"}) {
  return (
    <View style={{width:size, height:size,borderRadius : size/2, backgroundColor:"#3d015b", justifyContent:'center', alignItems:"center"}}>
      <MaterialCommunityIcons name={name} color={iconColor}
      size={size * 0.5} />
    </View>
  )
}