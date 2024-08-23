import { Text, View, StyleSheet,Image, TouchableOpacity, TextInput, Platform, Button, ScrollView, FlatList, Alert, RefreshControl, SafeAreaView } from 'react-native'
import Constants from 'expo-constants';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';
import {  useRouter } from 'expo-router';
import { Link } from 'expo-router'
import color from '../../../config/colors'
import Searchinput from "../../../components/Searchinput"
import Categories from '../../../components/Categories';
import { useGlobalContext } from '../../../context/GlobalProvide';
import { useLanguage } from '../../../context/languagecontext';

function Card() {

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { translate } = useLanguage(); // Import the translate function
  const [refreshing, setRefreshing] = useState(false);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [translations, setTranslations] = useState({});
 
  const { user, setUser, setIsLogged } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      // Translate static texts
      const staticTexts = {
        welcomeText: "welcome to PetTech",
        readMore: "Read More",
        loadingText: "Loading",
        Hello: "Hi"
      };

      const translated = {};
      for (const [key, text] of Object.entries(staticTexts)) {
        translated[key] = await translate(text);
      }
      setTranslations(translated);

      // Translate posts
      if (posts && posts.length > 0) {
        const postTranslations = await Promise.all(posts.map(async (post) => {
          const title = await translate(post.title);
          const description = await translate(post.description);
          return {
            ...post,
            title,
            description,
          };
        }));
        setTranslatedPosts(postTranslations);
      }
    };

    fetchTranslations();
  }, [posts, translate]);

  return (
    
      
    <FlatList
          data={translatedPosts} // Use translatedPosts instead of posts
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View style={{padding:10 , top:130}}>
            <Link href={`Home/${item.$id}`} asChild>
              <TouchableOpacity>
                <View style={styles.card}>
                <Image style={styles.image} source={{ uri:item.url }} />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle} numberOfLines={3} ellipsizeMode='end'>{item.description}</Text>
                    <TouchableOpacity>
                      <View style={styles.button}>
                        <Link style={styles.text} href={`Home/${item.$id}`}>{translations.readMore || 'Read More'}</Link>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link> 
            </View>
             )}
      ListHeaderComponent={() => (
        <View style={styles.Top}>
          <View style={styles.Status}>
            <View style={styles.WElstatus}>
              <Text style={styles.Welcome}>
              {translations.Hello || "Hi"} <Text style={{ fontWeight: "bold" }}>{user?.username}</Text>
              </Text>
              <Text style={styles.weltext}>{translations.welcomeText || "welcome to PetTech"}</Text>
            
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.cards}>
          <Text style={styles.new}>{translations.loadingText || "Loading"}</Text>
        </View>
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />

    
  );
}

const styles = StyleSheet.create({
  // ... (styles unchanged)
  Categories: {
    color: "white",
    fontSize: 20,
  },
 
  textInput: {
    color: "black",
    fontSize: 14,
    height: 50,
    width: 120,
    padding: 10,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
  },
  SearchContainer: {
    top: 140
  },
  search: {
    left: 220,
    top: 12,
    width: "100%"
  },
  over: {
    paddingHorizontal: 10
  },
  headerContainer: {
    marginVertical: 6,
    paddingHorizontal: 4
  },
  searchResultsText: {
    fontSize: 16,
    color: 'black',
    padding: 5
  },
  queryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 1
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold'
  },
  textInput: {
    color: "black",
    fontSize: 16,
    height: 50,
    width: 1900,
    padding: 10,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
  },
  search: {
    left: 10,
    top: 12,
    width: "100%",
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    top: 20,
  },
  Container: {
    padding: 10
  },

  image: {
    width: "100%",
    height: 100
  },
  warning: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40
  },
  Categories: {
    color: "white",
    fontSize: 20,
  },
  new: {
    textAlign: "center",
    PaddingTop: 134
  },
  textInput: {
    color: "black",
    fontSize: 14,
    height: 50,
    width: 120,
    padding: 10,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
  },
  SearchContainer: {
    top: 140
  },
  search: {
    left: 220,
    top: 12,
    width: "100%"
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    top: 120,
  },
  Top: {
    paddingTop: Constants.statusBarHeight
  },
  WElstatus: {
    flex: 1,
    top: 50,
  },
  Status: {
    position: 'absolute',
    backgroundColor: "#3d015b",
    height: 150,
    width: "100%",
    padding: 10,
  },
  Welcome: {
    color: "white",
    fontSize: 30,
  },
  weltext: {
    color: "white",
    paddingBottom: 30,
    fontSize: 24
  },
  text: {
    padding: 5,
    width: '30%',
    backgroundColor: "#3d015b",
    color: "white",
    fontSize: 12,
    paddingLeft: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: -7
  },
  card: {
    borderRadius: 15,
    backgroundColor: color.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  button: {
    margin: 10,
    backgroundColor: "white"
  },
  detailsContainer: {
    padding: 10,
  },
  subTitle: {
    fontSize: 14,
  },
  title: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 20,
  }

  
  
});

export default Card;
