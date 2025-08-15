// app/components/sidebar.tsx  (match the case with your file name)
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import Logo from "./Logo";

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  route?: Href;
  isActive?: boolean;
  disabled?: boolean;
};

function Item({ icon, label, route, isActive, disabled }: ItemProps) {
  return (
    <TouchableOpacity
      disabled={disabled || !route}
      onPress={route ? () => router.push(route) : undefined}
      style={[styles.item, isActive && styles.itemActive, (disabled || !route) && { opacity: 0.6 }]}
    >
      <View style={{ width: 26, alignItems: "center" }}>{icon}</View>
      <Text style={styles.itemText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Sidebar({
  active = "home",
  variant = "inline",
  onClose,
  width,
}: {
  active?: "home" | "checklist";
  variant?: "inline" | "overlay";
  onClose?: () => void;
  width?: number;
}) {
  return (
    <View
      style={[
        styles.wrap,
        { width: width ?? 260 },
        variant === "overlay" && styles.overlayWrap,
      ]}
    >
      <View style={{ paddingHorizontal: 18, paddingTop: 28, paddingBottom: 14, flexDirection: "row", alignItems: "center" }}>
        <Logo />
        {variant === "overlay" && (
          <TouchableOpacity onPress={onClose} style={{ marginLeft: "auto" }}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.hr} />

      <Item icon={<Ionicons name="home-outline" size={18} color="#fff" />} label="Home Page" route="/home" isActive={active === "home"} />
      <Item icon={<Feather name="list" size={18} color="#fff" />} label="Checklist" route="/checklist" isActive={active === "checklist"} />
      <Item icon={<Ionicons name="chatbox-ellipses-outline" size={18} color="#fff" />} label="Feedback" disabled />
      <Item icon={<Ionicons name="bar-chart-outline" size={18} color="#fff" />} label="Progress" disabled />
      <Item icon={<Ionicons name="paper-plane-outline" size={18} color="#fff" />} label="Organization" disabled />
      <Item icon={<Ionicons name="help-circle-outline" size={18} color="#fff" />} label="Questions" disabled />

      <View style={{ flex: 1 }} />
      <Item icon={<Ionicons name="person-outline" size={18} color="#fff" />} label="Account" disabled />
      <View style={{ height: 14 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "rgba(10, 32, 28, 0.92)",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.06)",
    paddingBottom: 8,
  },
  overlayWrap: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  hr: { height: 2, backgroundColor: "rgba(255,255,255,0.25)", marginBottom: 8, marginHorizontal: 18 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 18 },
  itemActive: { backgroundColor: "rgba(0,0,0,0.35)" },
  itemText: { color: "#fff", fontSize: 14, marginLeft: 12 },
});
