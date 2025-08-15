// app/about.tsx
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Sidebar from "./components/sidebar";
import { useSidebar } from "./lib/sidebar";        // from files in app/


const UI = {
  ribbonBg: "rgba(216,230,222,0.85)",
  titleBg: "#162d26",
  tabIdle: "#6AD987",
  tabActiveBg: "#E8F5EF",
  tabText: "#0a1f17",
  panelBg: "rgba(234,244,238,0.92)",
};

export default function About() {
  const { width } = useWindowDimensions();
  const isSmall = width < 820;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {!isSmall && <Sidebar active="home" />}

        <View style={styles.right}>
          {/* Ribbon */}
          <View style={styles.ribbon}>
            {isSmall && (
              <TouchableOpacity onPress={() => setMenuOpen(true)} style={{ paddingRight: 8 }}>
                <Ionicons name="menu" size={22} color={UI.tabText} />
              </TouchableOpacity>
            )}
            <Text style={styles.ribbonText}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={18} color={UI.tabText} />
          </View>

          {/* Title bar */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>HOME PAGE</Text>
          </View>

          {/* Tabs */}
          <View style={[styles.tabs, isSmall && { flexWrap: "wrap" }]}>
            <Tab label="Welcome" kind="idle" onPress={() => router.replace("/home")} />
            <Tab label="Culture" kind="idle" onPress={() => router.replace("/culture")} />
            <Tab label="About"   kind="active" onPress={() => {}} />
          </View>

          {/* Body */}
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
            {/* Row 1: Image + About text */}
            <View style={[styles.row, isSmall && { flexDirection: "column" }]}>
              <View style={[styles.imageCard, isSmall && { marginBottom: 12 }]}>
                <Image
                  source={require("../assets/images/team-meeting.jpg")}
                  style={{ width: "100%", height: "100%", borderRadius: 6 }}
                  resizeMode="cover"
                />
              </View>

              <View style={[styles.textCard, { flex: 1 }]}>
                <Text style={styles.h2}>About DIVU</Text>
                <Text style={styles.p}>
                  DIVU is focused on building a thoughtful onboarding experience for every new team member.
                  We value openness, craftsmanship, and steady iteration. This page gives you a quick overview
                  of who we are and how we work.
                </Text>
                <Text style={[styles.p, { marginTop: 8 }]}>
                  You’ll find our mission, values, and the basics of how we collaborate below. If you have
                  questions at any point, reach out—people are happy to help.
                </Text>
              </View>
            </View>

            {/* Row 2: Mission + Values */}
            <View style={[styles.row, isSmall && { flexDirection: "column" }]}>
              <View style={[styles.card, isSmall ? { marginBottom: 12 } : { marginRight: 10, flex: 1 }]}>
                <Text style={styles.h3}>Mission</Text>
                <Text style={styles.p}>
                  Deliver outstanding employee experiences that enable people to do their best work from day one.
                </Text>
              </View>

              <View style={[styles.card, { flex: 1 }]}>
                <Text style={styles.h3}>Values</Text>
                <Text style={styles.bullet}>• Put people first</Text>
                <Text style={styles.bullet}>• Communicate clearly</Text>
                <Text style={styles.bullet}>• Own the outcome</Text>
                <Text style={styles.bullet}>• Improve a little every day</Text>
              </View>
            </View>

            {/* Row 3: How we work */}
            <View style={styles.cardWide}>
              <Text style={styles.h3}>How we work</Text>
              <Text style={styles.p}>
                We bias toward action, document decisions, and keep feedback loops short. You’ll see checklists,
                lightweight rituals, and an emphasis on pairing to learn faster. This space will evolve as we grow.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Drawer on mobile */}
      {isSmall && menuOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
          <Sidebar
            active="home"
            variant="overlay"
            width={Math.min(280, width * 0.85)}
            onClose={() => setMenuOpen(false)}
          />
        </>
      )}
    </ImageBackground>
  );
}

function Tab({
  label,
  kind,
  onPress,
}: {
  label: string;
  kind: "active" | "idle";
  onPress: () => void;
}) {
  const active = kind === "active";
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}>
      <Text style={[styles.tabText, active && { fontWeight: "800" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  right: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },

  ribbon: {
    height: 38,
    backgroundColor: UI.ribbonBg,
    borderRadius: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ribbonText: { color: UI.tabText, fontWeight: "700" },

  titleBar: {
    marginTop: 8,
    backgroundColor: UI.titleBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  title: { color: "#ffffff", fontWeight: "700", letterSpacing: 0.5 },

  tabs: { flexDirection: "row", marginTop: 8 },
  tab: {
    height: 30,
    minWidth: 100,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  tabActive: { backgroundColor: UI.tabActiveBg, borderWidth: 1, borderColor: "#2d7f59" },
  tabIdle: { backgroundColor: UI.tabIdle },
  tabText: { color: UI.tabText, fontSize: 13 },

  row: { flexDirection: "row", marginTop: 10 },

  imageCard: {
    width: 260,
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: UI.panelBg,
    padding: 8,
    marginRight: 10,
  },

  textCard: {
    backgroundColor: UI.panelBg,
    borderRadius: 8,
    padding: 12,
  },

  card: {
    backgroundColor: UI.panelBg,
    borderRadius: 8,
    padding: 12,
  },

  cardWide: {
    marginTop: 12,
    backgroundColor: UI.panelBg,
    borderRadius: 8,
    padding: 12,
  },

  h2: { fontSize: 16, fontWeight: "800", color: "#0a1f17", marginBottom: 8 },
  h3: { fontSize: 14, fontWeight: "800", color: "#0a1f17", marginBottom: 6 },

  p: { color: "#1a2b23", lineHeight: 20, fontSize: 12.5 },
  bullet: { color: "#1a2b23", lineHeight: 20, fontSize: 12.5, marginLeft: 4 },

  backdrop: {
    position: "absolute",
    left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
});
