// components/AuthCard.tsx
import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

export default function AuthCard({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "rgba(15, 20, 20, 0.78)", // dark, slightly transparent
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
});
