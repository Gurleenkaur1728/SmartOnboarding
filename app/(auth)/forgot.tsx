import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import AuthCard from "../components/AuthCard";            // adjust to "../../components/AuthCard" if inside (auth)
import Logo from "../components/Logo";                    // adjust path similarly

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [empId, setEmpId] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = () => {
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk || !empId.trim() || !username.trim()) {
      Alert.alert("Missing info", "Please complete Email, Employee ID and Username.");
      return;
    }
    // mock success -> go to change password screen
    router.push("/forgot/change");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}         // "../../assets/images/bg.png" if inside (auth)
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.center}
      >
        <AuthCard>
          <Logo />
          <Text style={styles.title}>Forgot Password</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="name@company.com"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Employee ID</Text>
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

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Send New Password Link</Text>
          </TouchableOpacity>

          <Text style={styles.fine}>You’ll receive a link if details match our records.</Text>
        </AuthCard>
      </KeyboardAvoidingView>
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
  fine: { marginTop: 10, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 10 },
});
