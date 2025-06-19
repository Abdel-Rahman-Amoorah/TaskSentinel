import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="disclaimer" />
      <Stack.Screen name="homepage" />
      <Stack.Screen name="register" />
      <Stack.Screen name="Login" />
    </Stack>
  );
}
