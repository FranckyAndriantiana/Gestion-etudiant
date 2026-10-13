import UserTable from "@/components/tab-list";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function ListScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Liste des étudiants</ThemedText>
      <UserTable />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: "#1565",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 25,
    textTransform: "uppercase",
  },
});
