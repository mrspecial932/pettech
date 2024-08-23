import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.petTech.abbey",
  projectId: "662ee5c20039e2c90a86",
  databaseId: "665215d40030b5b4a31b",
  userCollectionId: "6652162300371b38d813",
  imagesCollectionId: "665216670022c4524d22",
  storagId: "66522a0c001554312915"
};

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(config.endpoint) // Set the API endpoint
  .setProject(config.projectId) // Set the project ID
  .setPlatform(config.platform); // Set the platform ID

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new user
export const createUser= async(email, password, username)=> {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      configonfig.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to get all posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.imagesCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error; // Propagate the error for further handling
  }
};

// Function to get a document by ID
export const getDocumentById = async (databaseId, collectionId, documentId) => {
  try {
    const document = await databases.getDocument(databaseId, collectionId, documentId);
    return document;
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    throw new Error(`Unable to fetch document with ID ${documentId}: ${error.message}`);
  }
};

// Function to search posts
export const SearchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.imagesCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error; // Propagate the error for further handling
  }
};

// Function to sign out the current session
export const signOut = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error; // Propagate the error for further handling
  }
};
