import { Stack } from "expo-router";

export default function RootLayout() {
  // Minimal, safe default: a single Stack with headers hidden.
  return <Stack screenOptions={{ headerShown: false }} />;
}
