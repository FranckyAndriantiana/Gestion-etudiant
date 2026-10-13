import { FlatList, Text, View } from "react-native";
import { ThemedView } from "./themed-view";

const users = [
  { id: "1", nom: "Francky", niveau: "L3" },
  { id: "2", nom: "Benja", niveau: "L2" },
  { id: "3", nom: "Luciano", niveau: "M2" },
];

export default function UserTable() {
  return (
    <ThemedView>
      <ThemedView style={{ flexDirection: "row", padding: 10 }}>
        <Text style={{ flex: 1, fontWeight: "bold", color: "#cccccc90" }}>
          Nom
        </Text>
        <Text style={{ flex: 1, fontWeight: "bold", color: "#cccccc90" }}>
          Niveau
        </Text>
      </ThemedView>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderTopWidth: 1,
              borderColor: "#ddd",
              backgroundColor: "rgba(29, 146, 175, 0.33)",
            }}
          >
            <Text style={{ flex: 1, color: "white" }}>{item.nom}</Text>
            <Text style={{ flex: 1, color: "white" }}>{item.niveau}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}
