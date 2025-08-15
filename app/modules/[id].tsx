// app/modules/[id].tsx
import React, { useMemo } from "react";
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Sidebar from "../components/sidebar";
import { Ionicons } from "@expo/vector-icons";

const UI = {
  ribbonBg: "rgba(216,230,222,0.85)",
  titleBg: "#162d26",
  panel: "rgba(234,244,238,0.92)",
  textDark: "#0a1f17",
  border: "rgba(0,0,0,0.12)",
  primary: "#2a7f59",
};

const DATA = [
  { id: 1, title: "Name of Module 1", assigned: "00-00-0000", duration: "10 min",
    body: "Intro to culture and ways of working. This module gives you a quick orientation and tips for your first week." },
  { id: 2, title: "Name of Module 2", assigned: "00-00-0000", duration: "15 min",
    body: "Security basics and acceptable use policy. Learn the essentials for keeping our data and devices safe." },
  { id: 3, title: "Name of Module 3", assigned: "00-00-0000", duration: "12 min",
    body: "Tools you will use daily and how to access them. Covers SSO, email, and core collaboration apps." },
  { id: 4, title: "Name of Module 4", assigned: "00-00-0000", duration: "8 min",
    body: "HR handbooks and benefits overview. Important links and who to contact for support." },
  { id: 5, title: "Name of Module 5", assigned: "00-00-0000", duration: "20 min",
    body: "Health & safety training. Basics for a safe workplace and emergency procedures." },
  { id: 6, title: "Name of Module 6", assigned: "00-00-0000", duration: "25 min",
    body: "Team-specific onboarding. Meet the team and learn the codebase, rituals, and expectations." },
];

export default function ModuleDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const modId = Number(id);
  const item = useMemo(() => DATA.find(d => d.id === modId), [modId]);
  const { width } = useWindowDimensions();
  const isSmall = width < 900;

  return (
    <ImageBackground source={require("../../assets/images/bg.png")} style={{ flex: 1, backgroundColor: "#0c1214" }} resizeMode="cover">
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {!isSmall && <Sidebar active="checklist" />}

        <View style={styles.right}>
          {/* Ribbon */}
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={18} color={UI.textDark} />
          </View>

          {/* Title + Back */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>{item ? item.title : "Module"}</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={16} color="#fff" />
              <Text style={{ color: "#fff", marginLeft: 6, fontWeight: "700" }}>Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <View style={styles.card}>
              <View style={styles.metaRow}>
                <Text style={styles.meta}><Text style={styles.metaLabel}>Assigned: </Text>{item?.assigned}</Text>
                <Text style={styles.meta}><Text style={styles.metaLabel}>Duration: </Text>{item?.duration}</Text>
              </View>

              <Text style={styles.body}>{item?.body}</Text>

              <View style={{ height: 12 }} />

              <TouchableOpacity
                onPress={() => router.replace("/modules")}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Mark as Read & Return</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  right: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },
  ribbon: {
    height: 48, backgroundColor: UI.ribbonBg, borderRadius: 6, paddingHorizontal: 14,
    alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 8,
  },
  ribbonText: { color: UI.textDark, fontWeight: "700", fontSize: 16 },

  titleBar: { backgroundColor: UI.titleBg, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 12,
    marginBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#fff", fontSize: 18, fontWeight: "800" },

  backBtn: { flexDirection: "row", alignItems: "center" },

  card: { backgroundColor: UI.panel, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: UI.border },
  metaRow: { flexDirection: "row", marginBottom: 8 },
  meta: { marginRight: 16, color: UI.textDark, fontWeight: "700" },
  metaLabel: { color: "rgba(0,0,0,0.55)", fontWeight: "600" },
  body: { color: UI.textDark, lineHeight: 20 },

  primaryBtn: { backgroundColor: UI.primary, paddingVertical: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  primaryBtnText: { color: "#fff", fontWeight: "800" },
});
