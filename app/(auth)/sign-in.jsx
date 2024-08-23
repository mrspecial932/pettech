import { StyleSheet, View, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import colors from "../../config/colors";
import { signIn, getCurrentUser } from "../../lib/appwrite"; // Ensure getCurrentUser is imported
import { useGlobalContext } from "../../context/GlobalProvide";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages

  const submit = async () => {
    if (!form.email === "" || !form.password === "") {
      Alert.alert("Please fill in all fields");
      return; // Stop execution if fields are empty
    }

    setSubmitting(true);
    setErrorMessage(""); // Clear previous error messages

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      router.replace("/Home");
    } catch (error) {
      // Set specific error message for incorrect credentials
      setErrorMessage(error.message || "An error occurred during sign-in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo-red.png")} />
        <Text style={styles.tagline}>PetsTech</Text>
      </View>
      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        keyboardType="email-address"
        icon="email"
        placeholder="email"
      />
      <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        secureTextEntry={true} // Hide password input
        icon="lock"
        placeholder="password"
      />
      <CustomButton
        title="Sign In"
        handlePress={submit}
        isLoading={isSubmitting}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text> // Display error message if present
      ) : null}
      <View style={styles.content}>
        <Text style={styles.text}>
          Don't Have an Account? <Link href="/sign-up" style={styles.link}>Sign Up</Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0f0f31",
    justifyContent: "center",
    padding: 15,
  },
  tagline: {
    fontSize: 50,
    fontWeight: "800",
    paddingVertical: 15,
    color: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  link: {
    color: "yellow",
  },
  content: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default SignIn;
