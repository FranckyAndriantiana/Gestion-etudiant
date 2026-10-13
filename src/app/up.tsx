import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function EditScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Modifier</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0,
    backgroundColor: "#1565",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 25,
    textTransform: "uppercase",
  },
});
