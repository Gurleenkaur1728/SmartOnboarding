import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import AuthCard from "../components/AuthCard";         // adjust to "../../../components/AuthCard" if path differs
import Logo from "../components/Logo";                 // adjust path similarly

export default function ChangePassword() {
  const [empId, setEmpId] = useState("");
  const [username, setUsername] = useState("");
  const [newPass, setNewPass] = useState("");

  const onChange = () => {
    if (!empId.trim() || !username.trim() || newPass.length < 6) {
      Alert.alert("Invalid input", "Fill all fields. Password must be 6+ characters.");
      return;
    }
    Alert.alert("Success", "Password changed. Use your new password to sign in.");
    router.replace("/"); // go back to Login
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <View style={styles.center}>
        <AuthCard>
          <Logo />
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            style={styles.input}
            value={empId}
            onChangeText={setEmpId}
            placeholder="12345"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholder="username"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />

          <Text style={[styles.label, { marginTop: 10 }]}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPass}
            onChangeText={setNewPass}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />

          <TouchableOpacity style={styles.button} onPress={onChange}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </AuthCard>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  title: { color: "#cfd8dc", fontSize: 16, textAlign: "center", marginBottom: 14 },
  label: { color: "#cfe6d6", fontSize: 12, marginBottom: 6 },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "white",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  button: {
    marginTop: 14,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b5bdc",
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 12 },
});
