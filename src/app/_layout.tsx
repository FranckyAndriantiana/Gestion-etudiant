import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1e9988" },
        headerTintColor: "#ffffff",
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Ketrika" }} />
    </Stack>
  );
}
