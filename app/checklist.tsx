import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./components/sidebar";
import { router } from "expo-router";
import { useSidebar } from "./lib/sidebar";        // from files in app/


const UI = {
  ribbonBg: "rgba(216,230,222,0.85)",
  titleBg: "#162d26",
  tabActive: "#75e690",
  tabIdle: "#2a7f59",
  tableHeader: "#a7a4ff", // light purple like your mock
  rowBg: "rgba(255,255,255,0.65)",
  rowAlt: "rgba(245,250,246,0.9)",
  grid: "rgba(0,0,0,0.12)",
  textDark: "#0a1f17",
};

type Row = {
  id: number;
  name: string;
  assigned: string;
  completed?: string | "-";
  feedback?: string | "-";
  done: boolean;
  link?: boolean;
};

export default function Checklist() {
  const { width } = useWindowDimensions();
  const isSmall = width < 900;

  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: "Name of Module 1", assigned: "00-00-0000", completed: "00-00-0000", feedback: "-", done: true },
    { id: 2, name: "Name of Module 2", assigned: "00-00-0000", completed: "-", feedback: "-", done: false, link: true },
    { id: 3, name: "Name of Module 3", assigned: "00-00-0000", completed: "-", feedback: "-", done: false },
    { id: 4, name: "Name of Module 4", assigned: "00-00-0000", completed: "00-00-0000", feedback: "Yes", done: true },
    { id: 5, name: "Name of Module 5", assigned: "00-00-0000", completed: "00-00-0000", feedback: "-", done: true },
    { id: 6, name: "Name of Module 6", assigned: "00-00-0000", completed: "-", feedback: "-", done: false },
  ]);

  const toggle = (id: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              done: !r.done,
              completed: !r.done ? formatToday() : "-",
            }
          : r
      )
    );
  };

  const tableMinWidth = useMemo(() => 980, []);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1, backgroundColor: "#0c1214" }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {!isSmall && <Sidebar active="checklist" />}

        <View style={styles.right}>
          {/* Ribbon */}
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={18} color={UI.textDark} />
          </View>

          {/* Title bar */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>ONBOARDING CHECKLIST</Text>
            {/* Tabs */}
            <View style={styles.tabs}>
              <Tab text="Checklist" active onPress={() => {}} />
                <Tab text="Modules" onPress={() => router.replace("/modules")} />
              <Tab
                text="Modules"
                onPress={() => {
                  // optional: route to a modules page later
                  Alert.alert("Modules", "Placeholder — we can build this after Checklist.");
                }}
              />
            </View>
          </View>

          {/* Subheading */}
          <Text style={styles.subhead}>
            <Text style={{ fontStyle: "italic" }}>Modules List</Text>
          </Text>

          {/* Table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={!isSmall}>
            <View style={[styles.table, { minWidth: tableMinWidth }]}>
              {/* Header */}
              <View style={styles.trHeader}>
                <CellHeader style={{ width: 140 }}>Completed</CellHeader>
                <CellHeader style={{ flex: 1 }}>Modules to Complete</CellHeader>
                <CellHeader style={{ width: 170 }}>Date{"\n"}Assigned</CellHeader>
                <CellHeader style={{ width: 170 }}>Date{"\n"}Completed</CellHeader>
                <CellHeader style={{ width: 170 }}>Feedback{"\n"}Given</CellHeader>
              </View>

              {/* Rows */}
              {rows.map((r, idx) => (
                <View
                  key={r.id}
                  style={[
                    styles.tr,
                    { backgroundColor: idx % 2 ? UI.rowAlt : UI.rowBg },
                  ]}
                >
                  {/* Completed */}
                  <View style={[styles.td, { width: 140, alignItems: "center" }]}>
                    <TouchableOpacity onPress={() => toggle(r.id)} accessibilityRole="button" accessibilityLabel="toggle complete">
                      {r.done ? (
                        <Ionicons name="checkmark-circle" size={20} color="#37c173" />
                      ) : (
                        <Ionicons name="ellipse-outline" size={20} color="#7b7b7b" />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Name / link */}
                  
{/* Name / link */}
<View style={[styles.td, { flex: 1 }]}>
  {r.link ? (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/modules/[id]", params: { id: String(r.id) } })}
    >
      <Text style={styles.link}>{r.name}</Text>
    </TouchableOpacity>
  ) : (
    <Text style={styles.tdText}>{r.name}</Text>
  )}
</View>

                  {/* Assigned */}
                  <View style={[styles.td, { width: 170 }]}>
                    <Text style={styles.tdText}>{r.assigned}</Text>
                  </View>

                  {/* Completed */}
                  <View style={[styles.td, { width: 170 }]}>
                    <Text style={styles.tdText}>{r.completed ?? "-"}</Text>
                  </View>

                  {/* Feedback */}
                  <View style={[styles.td, { width: 170 }]}>
                    <Text style={styles.tdText}>{r.feedback ?? "-"}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

/* ---------- helpers ---------- */
function Tab({ text, active, onPress }: { text: string; active?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, active ? { backgroundColor: UI.tabActive } : { backgroundColor: UI.tabIdle }]}
    >
      <Text style={[styles.tabText, active && { fontWeight: "800", color: "#0a1f17" }]}>{text}</Text>
    </TouchableOpacity>
  );
}

function CellHeader({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <View style={[styles.th, style]}>
      <Text style={styles.thText}>{children}</Text>
    </View>
  );
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function formatToday() {
  const d = new Date();
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${d.getFullYear()}`;
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  right: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },

  ribbon: {
    height: 48,
    backgroundColor: UI.ribbonBg,
    borderRadius: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ribbonText: { color: UI.textDark, fontWeight: "700", fontSize: 16 },

  titleBar: {
    backgroundColor: UI.titleBg,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", letterSpacing: 0.5 },

  tabs: { flexDirection: "row" },
  tab: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  tabText: { color: "#e9fff6", fontSize: 13, fontWeight: "600" },

  subhead: {
    color: "#0a1f17",
    marginTop: 6,
    marginBottom: 6,
    opacity: 0.9,
  },

  /* table */
  table: {
    backgroundColor: "rgba(245, 248, 246, 0.95)",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: UI.grid,
  },
  trHeader: {
    flexDirection: "row",
    backgroundColor: UI.tableHeader,
    borderBottomWidth: 1,
    borderBottomColor: UI.grid,
  },
  th: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: UI.grid,
  },
  thText: {
    color: "#0a1f17",
    fontWeight: "800",
    textAlign: "left",
  },

  tr: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: UI.grid,
    minHeight: 52,
  },
  td: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: UI.grid,
  },
  tdText: { color: "#0a1f17" },
  link: {
    color: "#2a5bf5",
    textDecorationLine: "underline",
  },
});
