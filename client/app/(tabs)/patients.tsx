import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Patients() {
  const [patients, setPatients] = useState([
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        stats: {
            exercisesCompleted: 10,
            totalXp: 1000,
            memoryLevel: 3,
        },
        difficulty: 2
    }, 
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        stats: {
            exercisesCompleted: 5,
            totalXp: 500,
            memoryLevel: 2,
        },
        difficulty: 1
    }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setSelectedDifficulty = (patient, level : number) => {
    let id  = patient.id;
    let updatedPatients = patients.map((p) => {
        if (p.id === id) {
            return { ...p, difficulty: level };
        }
        return p;
    })
    setPatients(updatedPatients);
  }

  // FIXME: This is a placeholder for the actual API call
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:3000/caregiver/getInfo", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: "caregiver1@example.com"
//             }),
//         }); // Ensure your API is accessible
//         if (!response.ok) {
//           throw new Error("Failed to fetch patients");
//         }
//         const data = await response.json();
//         setPatients(data);
//       } catch (e) {
//         setError(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error loading patients: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Patients</Text>
      {patients.map((patient) => (
        <View key={patient.id} style={styles.patientContainer}>
          <TouchableOpacity style={styles.patientButton}>
            <Text style={styles.patientName}>
              {patient.firstName} {patient.lastName}
            </Text>
          </TouchableOpacity>
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>
              <Text style={styles.statLabel}>Exercises Completed: </Text>
              {patient.stats.exercisesCompleted}
            </Text>
            <Text style={styles.statText}>
              <Text style={styles.statLabel}>Total XP: </Text>
              {patient.stats.totalXp}
            </Text>
            <Text style={styles.statText}>
              <Text style={styles.statLabel}>Memory Level: </Text>
              {patient.stats.memoryLevel}
            </Text>
            <Text style={styles.difficultyLabel}>Toggle Difficulty</Text>
            <View style={styles.difficultyContainer}>
              {[1, 2, 3].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyButton,
                    patient.difficulty === level && styles.difficultyButtonSelected,
                  ]}
                  onPress={() => setSelectedDifficulty(patient, level)}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      patient.difficulty === level && styles.difficultyTextSelected,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingTop: 60,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  patientContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  patientButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#555",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  patientName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    width: "80%",
    padding: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignItems: "center",
  },
  statText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  statLabel: {
    fontWeight: "bold",
  },
  difficultyLabel: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  difficultyContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  difficultyButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
    marginHorizontal: 5,
  },
  difficultyButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  difficultyText: {
    fontSize: 16,
    color: "#333",
  },
  difficultyTextSelected: {
    color: "#FFF",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
