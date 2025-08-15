// app/home.tsx
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useSidebar } from "./lib/sidebar";        // from files in app/


import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./components/sidebar"; // match your file name

export default function Home() {
  const { width } = useWindowDimensions();
  const isSmall = width < 820;           // breakpoint for tablet/phone
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<"welcome" | "culture" | "about">("welcome");

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {/* Sidebar (inline for large screens) */}
        {!isSmall && <Sidebar active="home" />}

        {/* Right / Main */}
        <View style={styles.right}>
          {/* Top bar */}
          <View style={styles.topbar}>
            {isSmall && (
              <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
                <Ionicons name="menu" size={22} color="#0a1f17" />
              </TouchableOpacity>
            )}
            <Text style={styles.greet}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={20} color="#0a1f17" />
          </View>

          {/* Tabs (wrap on small) */}
          <View style={[styles.tabs, isSmall && { flexWrap: "wrap" }]}>
           <Tab label="Welcome" active={tab==="welcome"} onPress={() => setTab("welcome")} />
<Tab label="Culture"  onPress={() => router.replace("/culture")} />
<Tab label="About"    onPress={() => router.replace("/about")} />
 
          </View>

          {/* Body: columns on large, stacked on small */}
          <View style={[styles.body, isSmall && { flexDirection: "column" }]}>
            <View style={[styles.hero, isSmall && { minHeight: 200 }]}>
              <Text style={[styles.heroText, isSmall && { fontSize: 28 }]}>IMAGE</Text>
            </View>

            <View style={[styles.copy, isSmall && { marginTop: 12 }]}>
              {tab === "welcome" && (
                <>
                  <Paragraph />
                  <Paragraph />
                  <Text style={styles.signature}>- DIVU</Text>
                </>
              )}
              {tab === "culture" && (
                <>
                  <Text style={styles.h2}>Our Culture</Text>
                  <Text style={styles.p}>Placeholder content—will add cards/videos later.</Text>
                </>
              )}
              {tab === "about" && (
                <>
                  <Text style={styles.h2}>About DIVU</Text>
                  <Text style={styles.p}>Company info placeholder.</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.bottomLine} />
        </View>
      </View>

      {/* Sidebar overlay for small screens */}
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

function Tab({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, active ? styles.tabActive : styles.tabIdle]}>
      <Text style={[styles.tabText, active && { color: "#0a1f17", fontWeight: "800" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Paragraph() {
  return (
    <>
      <Text style={styles.p}>
        Lorem ipsum dolor sit amet consectetur. Donec nulla at vel lobortis sed fames elit. In pellentesque laicina
        enim quisque. Duis velit gravida mauris senectus. Scelerisque dignissim facilisis sem nunc lacus augue sem
        sit eros. Faucibus molestie sed sed nam magna enim ac purus.
      </Text>
      <View style={{ height: 10 }} />
    </>
  );
}

const styles = StyleSheet.create({
  right: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  topbar: {
    height: 54,
    backgroundColor: "rgba(216, 230, 222, 0.9)",
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuBtn: { padding: 6, marginRight: 8 },
  greet: { color: "#0a1f17", fontWeight: "700", fontSize: 16, flex: 1, marginLeft: 8 },
  tabs: { flexDirection: "row", gap: 10, marginTop: 12 },
  tab: { borderRadius: 6, paddingVertical: 10, paddingHorizontal: 16 },
  tabActive: { backgroundColor: "#75e690" },
  tabIdle: { backgroundColor: "#2a7f59" },
  tabText: { color: "#d7fff0", fontSize: 14 },
  body: { flex: 1, flexDirection: "row", gap: 16, marginTop: 12 },
  hero: {
    flex: 1,
    backgroundColor: "#7167FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 360,
  },
  heroText: { color: "#fff", fontSize: 36, fontWeight: "800", letterSpacing: 2 },
  copy: { flex: 1, backgroundColor: "rgba(234, 244, 238, 0.92)", borderRadius: 8, padding: 16 },
  h2: { fontSize: 18, fontWeight: "800", color: "#0a1f17", marginBottom: 8 },
  p: { color: "#1a2b23", lineHeight: 22, fontSize: 14 },
  signature: { marginTop: 10, color: "#1a2b23", fontWeight: "700" },
  bottomLine: { height: 8, backgroundColor: "rgba(215, 230, 220, 0.7)", borderRadius: 3, marginTop: 12 },
  backdrop: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" },
});
