import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function Checkout() {
  const [isPaying, setIsPaying] = useState(false);
  const { total } = useLocalSearchParams<{ total?: string }>();

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      Alert.alert('Pagamento', 'Compra finalizada com sucesso!');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checkout</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Valor total</Text>
        <Text style={styles.total}>${total ?? '0.00'}</Text>
        <TouchableOpacity
          style={[styles.payButton, isPaying && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isPaying}
        >
          <Text style={styles.payButtonText}>Pagar Agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
