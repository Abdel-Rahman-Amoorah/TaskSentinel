import { StyleSheet, Text, View } from "react-native";

export default function Disclaimer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disclaimer</Text>
      <Text style={styles.paragraph}>
        This app was developed solely for educational purposes to explore how Splunk logs are created and forwarded.
      </Text>
      <Text style={styles.paragraph}>
        It is not intended for production use or any commercial deployment.
      </Text>
      <Text style={styles.thankYou}>
        Therefore... thank you for feeding me data. 🙃
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 24,
  },
  thankYou: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
