import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Homepage() {
  const [selectedOperation, setSelectedOperation] = useState("");
  const [comment, setComment] = useState("");

  const handleOperation = (operation: string) => {
    setSelectedOperation(operation);
    setComment(""); // Reset comment on new selection
  };

  const handleSubmit = () => {
    console.log(`Operation: ${selectedOperation}, Comment: ${comment}`);
    // You could send this to your backend or Splunk
    setSelectedOperation("");
    setComment("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to the Homepage!</Text>
      <Text style={styles.subtitle}>Choose a CRUD Operation:</Text>

      <View style={styles.buttonsContainer}>
        {["Create", "Read", "Update", "Delete"].map((op) => (
          <TouchableOpacity
            key={op}
            style={[
              styles.button,
              selectedOperation === op && styles.activeButton,
            ]}
            onPress={() => handleOperation(op)}
          >
            <Text style={styles.buttonText}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOperation ? (
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>
            Leave a comment for "{selectedOperation}":
          </Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Type your comment here..."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#4b5563",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 5,
  },
  activeButton: {
    backgroundColor: "#4338ca",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentSection: {
    width: "100%",
    alignItems: "center",
  },
  commentLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#e0e7ff",
    width: "100%",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
