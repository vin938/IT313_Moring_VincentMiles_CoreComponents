import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Student = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
};

const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Ana Cruz",
    year: "3rd Year",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    flagged: false,
  },
  {
    id: "s2",
    name: "Bea Santos",
    year: "2nd Year",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    flagged: false,
  },
  {
    id: "s3",
    name: "Cid Ramos",
    year: "4th Year",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    flagged: false,
  },
  {
    id: "s4",
    name: "Dex Alonzo",
    year: "1st Year",
    photoUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    flagged: false,
  },
  {
    id: "s5",
    name: "Eli Tan",
    year: "3rd Year",
    photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    flagged: false,
  },
];

function ProfileCard() {
  return (
    <View style={styles.profileCard}>
      <Image
        source={{
          uri: "https://randomuser.me/api/portraits/men/11.jpg",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Alex Morgan</Text>
      <Text style={styles.profileRole}>IT Instructor</Text>
    </View>
  );
}

function ModuleSearch() {
  const [query, setQuery] = useState("");

  const modules = [
    "Introduction to React Native",
    "React Fundamentals",
    "State and Hooks",
    "Core Components",
    "Navigation",
    "Styling and Layout",
  ];

  const filteredModules = modules.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Module Search</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search modules..."
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView style={styles.moduleList}>
        {filteredModules.map((item) => (
          <Text key={item} style={styles.moduleItem}>
            {item}
          </Text>
        ))}

        {filteredModules.length === 0 && (
          <Text style={styles.emptyText}>No modules found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      onPress={() => setLiked(!liked)}
      style={({ pressed }) => [
        styles.likeButton,
        liked && styles.likedButton,
        pressed && styles.pressedButton,
      ]}
    >
      <Text style={styles.likeText}>
        {liked ? "♥ Liked" : "♡ Like"}
      </Text>
    </Pressable>
  );
}

function LikeButtonOpacity() {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setLiked(!liked)}
      style={[
        styles.likeButton,
        liked && styles.likedButton,
      ]}
      activeOpacity={0.5}
    >
      <Text style={styles.likeText}>
        {liked ? "♥ Liked" : "♡ Like"}
      </Text>
    </TouchableOpacity>
  );
}

type StudentCardProps = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
};

function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.studentCard}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.studentImage}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>

        <Pressable
          onPress={() => onToggleFlag(id)}
          style={({ pressed }) => [
            styles.flagButton,
            flagged && styles.flaggedButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.flagText}>
            {flagged ? "Flagged for Advising" : "Flag for Advising"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function StudentDirectory() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [query, setQuery] = useState("");

  const toggleFlag = (id: string) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Student Directory</Text>

      <Text style={styles.subtitle}>
        Search and flag students for academic advising.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search student name..."
        value={query}
        onChangeText={setQuery}
      />

      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            year={student.year}
            photoUrl={student.photoUrl}
            flagged={student.flagged}
            onToggleFlag={toggleFlag}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No students found.</Text>
      )}

      <Text style={styles.sectionTitle}>
        Activity Sheet Components
      </Text>

      <ProfileCard />
      <ModuleSearch />

      <Text style={styles.sectionTitle}>
        Pressable Example
      </Text>

      <LikeButton />

      <Text style={styles.sectionTitle}>
        TouchableOpacity Example
      </Text>

      <LikeButtonOpacity />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  contentContainer: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#172554",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 18,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },

  studentImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  studentYear: {
    color: "#64748B",
    marginBottom: 8,
  },

  flagButton: {
    backgroundColor: "#2563EB",
    padding: 9,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  flaggedButton: {
    backgroundColor: "#16A34A",
  },

  flagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  pressedButton: {
    opacity: 0.7,
    backgroundColor: "#64748B",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#172554",
    marginTop: 22,
    marginBottom: 12,
  },

  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  profileRole: {
    color: "#64748B",
  },

  activityContainer: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
  },

  moduleList: {
    maxHeight: 250,
  },

  moduleItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  emptyText: {
    textAlign: "center",
    color: "#DC2626",
    padding: 15,
  },

  likeButton: {
    backgroundColor: "#2563EB",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  likedButton: {
    backgroundColor: "#16A34A",
  },

  likeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});