// app/index.tsx
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import AuthCard from "../app/components/AuthCard";
import Logo from "../app/components/Logo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
      imageStyle={styles.bgImg}
    >
      <View style={styles.center}>
        <AuthCard>
          <Logo />

          <Text style={styles.title}>Employee Login</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="rgba(255,255,255,0.6)"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home")} // temporary
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* This is an inline link to forgot */}
          <Link href="/forgot" style={styles.forgot}>
            Forgot password?
          </Link>

          <Text style={styles.disclaimer}>
            Use of this system is restricted to authorized users. Activity may be
            monitored.
          </Text>
        </AuthCard>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: "#0c1214" },
  bgImg: { opacity: 1 }, // keep the vivid green
  center: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 14,
    opacity: 0.9,
  },
  label: { color: "#cfe6d6", marginTop: 10, marginBottom: 6, fontSize: 12 },
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
    marginTop: 16,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5563f5", // purple-blue like your mock’s button
  },
  buttonText: { color: "white", fontWeight: "600" },
  forgot: {
    marginTop: 10,
    color: "#b9c4ff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  disclaimer: {
    marginTop: 14,
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    textAlign: "center",
  },
});
