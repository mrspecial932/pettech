import axios from 'axios';

const translateEndpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
const detectLanguageEndpoint = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
const subscriptionKey = "58629b7fef09477cb324b86fce5b5429";
const region = "westcentralus";

export async function translateText(text, targetLanguage) {
  if (!subscriptionKey || !region) {
    throw new Error('Missing subscription key or region.');
  }

  try {
    const response = await axios.post(translateEndpoint, [{ Text: text }], {
      params: {
        'to': targetLanguage,
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json'
      }
    });

    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Error during translation:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error after logging it
  }
}

export async function detectLanguage(text) {
  if (!subscriptionKey || !region) {
    throw new Error('Missing subscription key or region.');
  }

  try {
    const response = await axios.post(detectLanguageEndpoint, [{ Text: text }], {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json'
      }
    });

    return response.data[0].language; // Returns language code
  } catch (error) {
    console.error('Error detecting language:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error after logging it
  }
}
