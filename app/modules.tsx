// app/modules.tsx
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./components/sidebar";
import { router } from "expo-router";

const UI = {
  ribbonBg: "rgba(216,230,222,0.85)",
  titleBg: "#162d26",
  tabActive: "#75e690",
  tabIdle: "#2a7f59",
  panel: "rgba(234,244,238,0.92)",
  textDark: "#0a1f17",
  border: "rgba(0,0,0,0.12)",
  primary: "#2a7f59",
  primaryText: "#0a1f17",
  success: "#37c173",
  warn: "#e6a23c",
  muted: "rgba(0,0,0,0.55)",
};

type Status = "locked" | "available" | "in-progress" | "completed";

type ModuleItem = {
  id: number;
  title: string;
  description: string;
  assigned: string;
  duration: string;
  status: Status;
  progress: number; // 0..100
};

export default function Modules() {
  const { width } = useWindowDimensions();
  const isSmall = width < 900;

  const [modules, setModules] = useState<ModuleItem[]>([
    { id: 1, title: "Name of Module 1", description: "Short intro to our culture and ways of working.", assigned: "00-00-0000", duration: "10 min", status: "completed", progress: 100 },
    { id: 2, title: "Name of Module 2", description: "Security basics and acceptable use policy.",        assigned: "00-00-0000", duration: "15 min", status: "available",  progress: 0   },
    { id: 3, title: "Name of Module 3", description: "Tools you’ll use daily and how to access them.",     assigned: "00-00-0000", duration: "12 min", status: "in-progress", progress: 45  },
    { id: 4, title: "Name of Module 4", description: "HR handbooks and benefits overview.",                assigned: "00-00-0000", duration: "8 min",  status: "completed",  progress: 100 },
    { id: 5, title: "Name of Module 5", description: "Health & safety training.",                           assigned: "00-00-0000", duration: "20 min", status: "available",  progress: 0   },
    { id: 6, title: "Name of Module 6", description: "Team-specific onboarding.",                           assigned: "00-00-0000", duration: "25 min", status: "locked",     progress: 0   },
  ]);

  const gridCols = useMemo(() => (isSmall ? 1 : 2), [isSmall]);

  const nextActionLabel = (m: ModuleItem) => {
    if (m.status === "locked") return "Locked";
    if (m.status === "completed") return "View";
    if (m.status === "in-progress") return "Resume";
    return "Start";
  };

  const goToDetails = (id: number) => {
    router.push({ pathname: "/modules/[id]", params: { id: String(id) } });
  };

  const onPrimary = (m: ModuleItem) => {
    if (m.status === "locked") return;
    // You can keep “Start/Resume” behavior here OR just go straight to details.
    // I’ll navigate to details (common UX).
    goToDetails(m.id);
  };

  const markComplete = (id: number) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, status: "completed", progress: 100 } : m)));
  };

  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={{ flex: 1, backgroundColor: "#0c1214" }} resizeMode="cover">
      <View style={{ flex: 1, flexDirection: isSmall ? "column" : "row" }}>
        {!isSmall && <Sidebar active="checklist" />}

        <View style={styles.right}>
          {/* Ribbon */}
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Welcome &lt;name&gt; to DIVU!</Text>
            <Ionicons name="apps-outline" size={18} color={UI.textDark} />
          </View>

          {/* Title + Tabs */}
          <View style={styles.titleBar}>
            <Text style={styles.title}>ONBOARDING CHECKLIST</Text>
            <View style={styles.tabs}>
              <Tab text="Checklist" onPress={() => router.replace("/checklist")} />
              <Tab text="Modules" active onPress={() => {}} />
            </View>
          </View>

          {/* Content */}
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Text style={styles.subhead}><Text style={{ fontStyle: "italic" }}>Modules List</Text></Text>

            <View style={styles.grid}>
              {modules.map((m, idx) => (
                <View
                  key={m.id}
                  style={[
                    styles.card,
                    isSmall ? styles.cardFull : idx % 2 === 0 ? styles.cardLeft : styles.cardRight,
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{m.title}</Text>
                    <StatusPill status={m.status} />
                  </View>

                  <Text style={styles.cardDesc}>{m.description}</Text>

                  <View style={styles.metaRow}>
                    <Meta label="Assigned" value={m.assigned} />
                    <Meta label="Duration" value={m.duration} />
                  </View>

                  {/* Progress */}
                  <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${m.progress}%`,
                            backgroundColor:
                              m.status === "completed" ? UI.success : m.status === "locked" ? UI.muted : UI.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{m.progress}%</Text>
                  </View>

                  {/* Actions */}
                  <View style={styles.actions}>
                    <TouchableOpacity
                      disabled={m.status === "locked"}
                      onPress={() => onPrimary(m)}
                      style={[styles.primaryBtn, m.status === "locked" && { opacity: 0.5 }]}
                    >
                      <Text style={styles.primaryBtnText}>{nextActionLabel(m)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => goToDetails(m.id)} style={styles.secondaryBtn}>
                      <Text style={styles.secondaryBtnText}>View module</Text>
                    </TouchableOpacity>

                    {m.status !== "completed" && m.status !== "locked" && (
                      <TouchableOpacity onPress={() => markComplete(m.id)} style={styles.secondaryBtn}>
                        <Text style={styles.secondaryBtnText}>Mark complete</Text>
                      </TouchableOpacity>
                    )}
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

/* ------------ little subcomponents ------------ */
function Tab({ text, active, onPress }: { text: string; active?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, active ? { backgroundColor: UI.tabActive } : { backgroundColor: UI.tabIdle }]}>
      <Text style={[styles.tabText, active && { fontWeight: "800", color: UI.primaryText }]}>{text}</Text>
    </TouchableOpacity>
  );
}

function StatusPill({ status }: { status: Status }) {
  const info =
    status === "completed" ? { color: UI.success, label: "Completed", icon: "checkmark-circle" } :
    status === "in-progress" ? { color: UI.warn, label: "In progress", icon: "time" } :
    status === "available" ? { color: UI.primary, label: "Available", icon: "play-circle" } :
    { color: UI.muted, label: "Locked", icon: "lock-closed" };
  return (
    <View style={[styles.pill, { borderColor: info.color }]}>
      <Ionicons name={info.icon as any} size={12} color={info.color} />
      <Text style={[styles.pillText, { color: info.color }]}>{info.label}</Text>
    </View>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

/* ------------------- styles ------------------- */
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

  subhead: { color: UI.textDark, marginTop: 8, marginBottom: 8, opacity: 0.9 },

  /* GRID */
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  cardFull: { flexBasis: "100%", maxWidth: "100%" },
  cardLeft: { flexBasis: "48%", maxWidth: "48%" },
  cardRight: { flexBasis: "48%", maxWidth: "48%" },

  /* CARD */
  card: {
    backgroundColor: UI.panel,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: UI.border,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  cardTitle: { color: UI.textDark, fontSize: 16, fontWeight: "800", flex: 1 },
  cardDesc: { color: UI.textDark, opacity: 0.9, marginBottom: 10 },

  pill: { flexDirection: "row", alignItems: "center", borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  pillText: { marginLeft: 6, fontWeight: "700", fontSize: 11 },

  metaRow: { flexDirection: "row", marginBottom: 10 },
  meta: { marginRight: 16 },
  metaLabel: { color: UI.muted, fontSize: 11 },
  metaValue: { color: UI.textDark, fontWeight: "700" },

  progressRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  progressTrack: { flex: 1, height: 10, backgroundColor: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: "100%" },
  progressText: { width: 44, textAlign: "right", color: UI.textDark, fontWeight: "700" },

  actions: { flexDirection: "row", flexWrap: "wrap" },
  primaryBtn: { backgroundColor: UI.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginRight: 10, marginBottom: 8 },
  primaryBtnText: { color: "white", fontWeight: "800" },
  secondaryBtn: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: UI.border, marginRight: 10, marginBottom: 8 },
  secondaryBtnText: { color: UI.textDark, fontWeight: "700" },
});
