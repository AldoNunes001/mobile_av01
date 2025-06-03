// hooks/useFirebase.ts
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

export default function useFirebase() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsReady(true);
    });
    return unsubscribe;
  }, []);

  return isReady;
}

// Uso no componente:
const isFirebaseReady = useFirebase();
if (!isFirebaseReady) return <LoadingScreen />;