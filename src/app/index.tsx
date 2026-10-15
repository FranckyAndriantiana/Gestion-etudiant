import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import LoginScreen from "../components/LoginScreen";
import StudentCard from "../components/StutendCard";
import {
  addStudentDB,
  deleteStudentDB,
  getStudentsDB,
  initDatabase,
  updateStudentDB,
} from "../storage/database";
import { Student } from "../types/student";

export default function IndexScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // liste etudiant local
  const [students, setStudents] = useState<Student[]>([]);

  // etat formulaire
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Initialisation de SQLite et chargement des données au démarrage
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        await initDatabase();
        const list = await getStudentsDB();
        setStudents(list);
      } catch (error) {
        Alert.alert(
          "Erreur",
          "Impossible d’initialiser la base de données SQLite.",
        );
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Fonction utilitaire pour rafraîchir la liste depuis SQLite
  const reloadStudents = async () => {
    try {
      const list = await getStudentsDB();
      setStudents(list);
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la mise à jour de la liste.");
    }
  };

  // Enregistrer un étudiant (Create / Update) dans SQLite
  const handleSaveStudent = async () => {
    if (!nom.trim() || !email.trim()) {
      Alert.alert("Erreur", "Veuillez remplir le nom et l’email.");
      return;
    }
    try {
      if (editingId) {
        // Action Update
        await updateStudentDB({ id: editingId, nom, email });
        setEditingId(null);
      } else {
        // Action Create
        const newStudent: Student = {
          id: Date.now().toString(),
          nom,
          email,
        };
        await addStudentDB(newStudent);
      }
      setNom("");
      setEmail("");
      await reloadStudents();
    } catch (error) {
      Alert.alert("Erreur", "L’opération SQLite a échoué.");
    }
  };

  // Préparer le formulaire pour la modification
  const handleEdit = (student: Student) => {
    setNom(student.nom);
    setEmail(student.email);
    setEditingId(student.id);
  };

  // Annuler la modification en cours
  const handleCancelEdit = () => {
    setNom("");
    setEmail("");
    setEditingId(null);
  };

  // Supprimer un étudiant (Delete) dans SQLite
  const handleDelete = async (id: string) => {
    try {
      await deleteStudentDB(id);
      await reloadStudents();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer cet étudiant.");
    }
  };

  // auth include
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>
          Initialisation de la base SQLite...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des Étudiants</Text>
        <Button
          title="Déconnexion"
          color="#6b7280"
          onPress={() => setIsLoggedIn(false)}
        />
      </View>

      {/* Formulaire  */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>
          {editingId ? "Modifier l’étudiant" : "Ajouter un étudiant"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.formButtons}>
          <Button
            title={editingId ? "Enregistrer" : "Ajouter"}
            onPress={handleSaveStudent}
          />
          {editingId && (
            <Button
              title="Annuler"
              color="#ef4444"
              onPress={handleCancelEdit}
            />
          )}
        </View>
      </View>

      {/* Liste  */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucun étudiant dans la base SQLite.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f3f4f6",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#374151" },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 20,
    fontSize: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  form: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  formTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});
