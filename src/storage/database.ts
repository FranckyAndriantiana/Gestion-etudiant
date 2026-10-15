import * as SQLite from "expo-sqlite";
import { Student } from "../types/student";

// Ouverture SQLite locale
async function getDB() {
  return await SQLite.openDatabaseAsync("students.db");
}

// Initialisation de la table si elle n'existe pas
export async function initDatabase() {
  const db = await getDB();
  await db.execAsync(` 
        CREATE TABLE IF NOT EXISTS etudiants ( 
        id TEXT PRIMARY KEY NOT NULL, 
        nom TEXT NOT NULL, 
        email TEXT NOT NULL ); 
        `);
}

// Récupérer les étudiants
export async function getStudentsDB(): Promise<Student[]> {
  const db = await getDB();
  return await db.getAllAsync<Student>("SELECT * FROM etudiants");
}

// Ajouter un étudiant
export async function addStudentDB(student: Student) {
  const db = await getDB();
  await db.runAsync("INSERT INTO etudiants (id, nom, email) VALUES (?, ?, ?)", [
    student.id,
    student.nom,
    student.email,
  ]);
}

// Modifier un étudiant
export async function updateStudentDB(student: Student) {
  const db = await getDB();
  await db.runAsync("UPDATE etudiants SET nom = ?, email = ? WHERE id = ?", [
    student.nom,
    student.email,
    student.id,
  ]);
}

// Supprimer un étudiant
export async function deleteStudentDB(id: string) {
  const db = await getDB();
  await db.runAsync("DELETE FROM etudiants WHERE id = ?", [id]);
}
