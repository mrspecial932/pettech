import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useAppwrite from '../../../lib/useAppwrite';
import { getAllPosts } from '../../../lib/appwrite';
import { useLanguage } from '../../../context/languagecontext'; // Ensure path is correct
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const ListingDetail = () => {
  const [post, setPost] = useState(null);
  const [translatedPost, setTranslatedPost] = useState(null);
  const [translations, setTranslations] = useState({});
  const { data: posts, error } = useAppwrite(getAllPosts);
  const { id } = useLocalSearchParams();
  const { translate } = useLanguage(); // Import the translate function
  const router = useRouter(); // Initialize the router

  // Fetch translations for static text
  useEffect(() => {
    const fetchTranslations = async () => {
      const staticTranslations = {
        descriptionLabel: await translate('Description'),
        locationLabel: await translate('Location'),
        lifespanLabel: await translate('Duration'),
        weightLabel: await translate('Scale'),
        habitatLabel: await translate('Habitat'),
        gender: await translate('Gender status'),
        gender: await translate('Gender status'),
      };
      setTranslations(staticTranslations);
    };

    fetchTranslations();
  }, [translate]);

  // Fetch and translate post content
  useEffect(() => {
    const fetchPost = async () => {
      if (posts && id) {
        const foundPost = posts.find((p) => p.$id === id);
        setPost(foundPost);

        // Translate post content
        if (foundPost) {
          const translatedTitle = await translate(foundPost.title);
          const translatedDescription = await translate(foundPost.description);
          const translatedLocation = await translate(foundPost.location);
          const translatedgender = await translate(foundPost.gender);
          const translatedhabitat = await translate(foundPost.habitat);
          const translatedweight = await translate(foundPost.weight);
          setTranslatedPost({
            ...foundPost,
            title: translatedTitle,
            gender: translatedgender,
            description: translatedDescription,
            location: translatedLocation,
            habitat:translatedhabitat,
            weight:translatedweight
          });
        }
      }
    };

    fetchPost();
  }, [posts, id, translate]);

  if (error) {
    return <Text style={styles.errorText}>{translations.error || 'Error loading posts.'}</Text>;
  }

  if (!posts || !id) {
    return <Text style={styles.loadingText}>{translations.loading || 'Loading...'}</Text>;
  }

  if (!translatedPost) {
    return <Text style={styles.loadingText}>{translations.loading || 'Loading...'}</Text>;
  }

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.list}>
        {/* Image container with relative positioning */}
        <View style={styles.imageContainer}>
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name='chevron-back-outline' size={30} color="black" />
          </TouchableOpacity>
          <Image style={styles.image} source={{ uri: translatedPost.url }} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.heading}>
            <Text style={styles.title}>{translatedPost.title}</Text>
            <Text style={{ marginTop: 5 }}>{translations.gender || 'Gender'}: {translatedPost.gender}</Text>
            <View style={styles.type}> 
      <View style={styles.cat}>
        <Text style={styles.catText}>{translations.weightLabel || 'Weight'}</Text>
        <Text style={{ color: "white" }}>{translatedPost.weight}</Text>
      </View>
      <View style={styles.cat}>
        <Text style={styles.catText}>{translations.habitatLabel || 'Habitat'}</Text>
        <Text style={{ color: "white" }}>{translatedPost.habitat}</Text>
      </View>
    </View>
    
          <View style={styles.Des}>
            <Text style={styles.describe}>{translations.descriptionLabel || 'Description'}</Text>
            <Text style={styles.price}>{translatedPost.description}</Text>
            <Text style={styles.describe}>{translations.locationLabel || 'Location'}</Text>
            <Text style={styles.price}>{translatedPost.location}</Text>
          </View>
        </View>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  loadingText: {
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  Des: {
    marginTop:20,
  },
  catText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 15,
    padding: 2
  },
  type: {
    flex: 1,
    marginLeft: -8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    top: 10,
  },
  cat: {
    backgroundColor: "#3d015b",
    height: 60,
    width: 180,
    color: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    marginBottom: 10,
    borderBottomColor: 2,
    borderColor: "#4ecdc4"
  },
  detailsContainer: {
    top: 10,
    padding: 10,
  },
  imageContainer: {
    position: 'relative', // Ensure relative positioning
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500"
  },
  describe: {
    fontSize: 20,
    fontWeight: "800",
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    lineHeight: 20,
    color: "#555455"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute', // Position on top of image
    top: 30,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 55, // Circular button
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Optional: for shadow on Android
    shadowColor: '#000', // Optional: for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: for shadow on iOS
    shadowOpacity: 0.3, // Optional: for shadow on iOS
    shadowRadius: 4, // Optional: for shadow on iOS
    zIndex: 1, // Ensure button is on top of the image
  }
});

export default ListingDetail;
