import { Stack } from 'expo-router';
import { UserProvider } from './context';
export default function RootLayout() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}
