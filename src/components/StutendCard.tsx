import { Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../types/student";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{student.nom}</Text>
        <Text style={styles.email}>{student.email}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.editBtn]}
          onPress={() => onEdit(student)}
        >
          <Text style={styles.btnText}>Éditer</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteBtn]}
          onPress={() => onDelete(student.id)}
        >
          <Text style={styles.btnText}>X</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  info: { flex: 1 },

  name: { fontSize: 16, fontWeight: "bold", color: "#1f2937" },

  email: { fontSize: 14, color: "#6b7280" },

  actions: { flexDirection: "row", gap: 8 },

  button: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },

  editBtn: { backgroundColor: "#19aa8a" },

  deleteBtn: { backgroundColor: "#ae3232" },

  btnText: { color: "#ffffff", fontWeight: "bold", fontSize: 12 },
});
