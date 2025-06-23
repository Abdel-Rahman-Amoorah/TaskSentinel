import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { handleRegister } from "./API";
import { useUser } from "./context";
export default function Register() {
  const {setUsername} = useUser();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const checkUser = (user: string,password:string,email:string) => {
    const userRegix = /^[a-zA-Z0-9_]{5,}$/;
    const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegix = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;
    if (user === "" || password === "") {
      alert("Please fill in all fields");
      return false;
    }
    if (!emailRegix.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!userRegix.test(user)) {
      alert("Username must be at least 5 characters long and can only contain letters, numbers, and underscores.");
      return false;
    }
    if (!passwordRegix.test(password)) {
      alert("Password must be at least 8 characters long and contain at least one letter and one number.");
      return false;
    }
    
    return true;
  }
  const handleRegisterSub = async () => {
    // Send registration data to backend and Splunk
    if (!checkUser(user.username, user.password, user.email)) {
      return;
    }
    const data = await handleRegister(user.username, user.password, user.email)

    if (data.message == "Register data stored successfully") {
      setError(false);
      setUsername(user.username);
      router.push("/disclaimer")
    }
    else if (data.error == "Username already exists") {
      setError(true);
      alert("User already exists. Please try a different username.");
    }
    else {
      setError(true);
      alert("Registration failed. Please try again.");
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.subHeader}>Let's register and send data to our Splunk!</Text>
      {error && <Text style={{ color: "red" }}>Registration failed. Please try again.</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ddd"
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
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

      <TouchableOpacity style={styles.button} onPress={handleRegisterSub}>
        <Text style={styles.buttonText}>Create a New Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => router.push("/Login")}>
        <Text style={styles.buttonText}>Already have an account?</Text>
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
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#1e90ff",
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
