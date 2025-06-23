import { router } from "expo-router"; 
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { handleLogin } from "./API";
import { useUser } from "./context";
export default function Login() {
  const {setUsername} = useUser()
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error,setError] = useState(false);
  
  const handleLoginsub = async () => {
    // Send login data to backend
    const data = await handleLogin(user.username,user.password)
    if (data === "Login successful") {
      setError(false);
      setUsername(user.username);
      router.push("/homepage");
      console.log("Login successful", data);
    }
    else {
      setError(true);
      alert("Login failed. user not found or password is incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.subHeader}>Let's login and send data to our Splunk!</Text>
      {error && <Text style={{ color: "red" }}>Login failed. Please try again.</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ddd"
        onChangeText={(text) => setUser({ ...user, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ddd"
        secureTextEntry
        onChangeText={(text) => setUser({ ...user, password: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginsub}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => router.push("/register")}>
        <Text style={styles.buttonText}>Create a new account</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Made by Abdel-Rahman Amoorah</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#5A67D8",
    color: "#fff",
    padding: 12,
    width: "100%",
    borderRadius: 25,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
});
