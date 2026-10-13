import { StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Button } from "expo-router/build/react-navigation";

export default function LoginForm() {
  return (
    <ThemedView type="backgroundElement" style={styles.stepContainer}>
      <ThemedText type="title" style={styles.title}>
        Ketrika
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        S'authentifier
      </ThemedText>

      <ThemedText type="code" style={styles.code}>
        Nom d'utilisateur :
      </ThemedText>

      <TextInput
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#999"
        autoCapitalize="none"
        style={styles.input}
      />

      <ThemedText type="code" style={styles.code}>
        Mot de passe :
      </ThemedText>

      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
      />

      <Button
        color="white"
        style={{
          backgroundColor: "#0cbdaf",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 15,
        }}
        onPress={() => alert("Connexion réussie!")}
      >
        Se connecter
      </Button>
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

  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 48,
    textTransform: "uppercase",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 20,
    textTransform: "capitalize",
    color: "#2bf2c4",
  },

  code: {
    textTransform: "uppercase",
  },

  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#fff",
    width: "100%",
  },

  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
