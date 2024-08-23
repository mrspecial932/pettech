import { Text, View, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/languagecontext'; // Ensure the path is correct

function NewImage() {
  const { translate } = useLanguage(); // Import the translate function
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const fetchTranslation = async () => {
      const translation = await translate('Search Now');
      setTranslatedText(translation);
    };

    fetchTranslation();
  }, [translate]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/search.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.warning}>{translatedText || 'Search Now!!!'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    height: 350
  },
  warning: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40
  },
});

export default NewImage;
