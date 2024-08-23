import { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLanguage } from "../context/languagecontext";

const SearchInput = ({ initialQuery }) => {
  const { translate } = useLanguage(); 
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const fetchPlaceholder = async () => {
      const placeholderText = await translate('Search '); // Use the key for your placeholder text
      setPlaceholder(placeholderText);
    };

    fetchPlaceholder();
  }, [translate]);


  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder={placeholder || ' Search ....'}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <View style={styles.icon}>
          <FontAwesome name="search" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  icon:{
    padding:10,
    
  },
  
  searchSection:{
    flexDirection: "row",
    backgroundColor:"#fff",
    marginVertical:15,
    width:"95%",
     paddingLeft:10
  },
  Buttons:{
    backgroundColor:"#f3790c",
    padding:"20",
    width:40,
    color:"white",
    alignContent:"center",
    alignItems:"center",
    verticalAlign:"center"
  },
  input:{
    width:"90%",
    height:30
  }
})
