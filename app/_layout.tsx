import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

//IMPORTACAO FIREBASECONFIG
import '@/firebaseConfig';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';

export default function RootLayout() {
  useFrameworkReady();

  // ✅ Listener para manutenção de sessão
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}