// Settings.js
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Screen from '../../components/Screen';
import Icon from '../../components/icon';
import Listitem from '../../components/Listitem';
import { useLanguage } from '../../context/languagecontext'; // Ensure path is correct
import {  signOut } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvide';

export default function Settings() {
  const { language, changeLanguage, translate } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const [translatedTexts, setTranslatedTexts] = useState({});
  const { user, setUser,  setIsLoggedIn } = useGlobalContext();
 
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  useEffect(() => {
    const updateTranslation = async () => {
      const textsToTranslate = {
        welcomeText: "welcome you to PetTech",
        home: "Home",
        logout: "sign out",
        language: "Language",
      };

      const translated = {};
      for (const [key, text] of Object.entries(textsToTranslate)) {
        translated[key] = await translate(text);
      }

      setTranslatedTexts(translated);
    };

    updateTranslation();
  }, [language, translate]);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.statusBar}>
          <Image  source={{uri:user?.avatar}}/>
          <Image style={styles.image} source={require('../../assets/mosh.jpg')} />
          <View style={styles.welcomeStatus}>
            <Text style={styles.welcomeName}>Olawale Elisha</Text>
            <Text style={styles.welcomeText}>{translatedTexts.welcomeText || "welcome you to PetTech"}</Text>
          </View>
        </View>
      </View>

      <Screen>
        <Link href="/Home">
          <Listitem
            title={translatedTexts.home || "Home"}
            ImageComponent={<Icon name="home" />}
          />
        </Link>

        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Listitem
            title={translatedTexts.language || "Language"}
            ImageComponent={<Icon name="translate" />}
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageChange('en')}>
              <Text style={styles.dropdownText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleLanguageChange('yo')}>
              <Text style={styles.dropdownText}>Yoruba</Text>
            </TouchableOpacity>
          </View>
        )}

       
       <Link href="../../(auth)/sign-in">    
          <Listitem
            title={translatedTexts.logout || "sign out"}
            ImageComponent={<Icon name="logout" />}
          />
          </Link>
       
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    // Styling for the top section
  },
  statusBar: {
    backgroundColor: '#3d015b',
    height: 200,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  welcomeStatus: {
    marginLeft: 10,
  },
  welcomeName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
});
