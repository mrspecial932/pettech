import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet,Image, TouchableOpacity, Platform, Dimensions, SafeAreaView, FlatList, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import useAppwrite from "../../../lib/useAppwrite";
import { SearchPosts } from "../../../lib/appwrite";
import color from '../../../config/colors';
import Searchinput from "../../../components/Searchinput";
import { Link } from "expo-router";
import NewImage from "../../../components/newImage";
import { useLanguage } from '../../../context/languagecontext'; // Ensure the path is correct

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => SearchPosts(query));
  const { translate } = useLanguage(); // Import the translate function
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Fetch and set translations for static text
    const fetchTranslations = async () => {
      const staticTranslations = {
        searchResults: await translate('Search Results'),
        noResults: await translate('No results found'),
        readMore: await translate('Read More')
      };
      setTranslations(staticTranslations);
    };

    fetchTranslations();
  }, [translate]);

  useEffect(() => {
    // Translate post content when posts change
    const fetchTranslatedPosts = async () => {
      if (posts) {
        const translated = await Promise.all(posts.map(async (post) => {
          const title = await translate(post.title);
          const description = await translate(post.description);
          return {
            ...post,
            title,
            description
          };
        }));
        setTranslatedPosts(translated);
      }
    };

    fetchTranslatedPosts();
  }, [posts, translate]);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.over}>
        <FlatList
          data={translatedPosts} // Use translatedPosts instead of posts
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Link href={`Home/${item.$id}`} asChild>
              <TouchableOpacity>
                <View style={styles.card}>
                <Image style={styles.image} source={{ uri:item.url }} />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle} numberOfLines={3} ellipsizeMode='end'>{item.description}</Text>
                    <TouchableOpacity>
                      <View style={styles.button}>
                        <Link style={styles.text}  href={`Home/${item.$id}`}>{translations.readMore || 'Read More'}</Link>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <Searchinput initialQuery={query} refetch={refetch} />
              <Text style={styles.searchResultsText}>
                {translations.searchResults || 'Search Results'}
              </Text>
              
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <NewImage />
              <Text style={styles.noResultsText}>
                {translations.noResults || 'No results found'}
              </Text>
            </View>
          )}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  over: {
    paddingHorizontal: 10
  },
  headerContainer: {
    marginVertical: 6,
    paddingHorizontal: 4,
    marginTop:28
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
    height: 300,
    width: "100%",
    padding: 10,
  },
  Welcome: {
    color: "white",
    fontSize: 20,
  },
  weltext: {
    color: "white",
    paddingBottom: 30
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

export default Search;
