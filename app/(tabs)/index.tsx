import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

const CATEGORIES = [
  'All',
  'Clothing',
  'Shoes',
  'Accessories',
  'Electronics',
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    category: 'Shoes',
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f',
    category: 'Clothing',
  },
  {
    id: 3,
    name: 'Leather Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.title}>Find your style</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        {filteredProducts.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(product.id)}
            >
              <Heart
                size={20}
                color={favorites.includes(product.id) ? '#dc2626' : '#666'}
                fill={favorites.includes(product.id) ? '#dc2626' : 'transparent'}
              />
            </TouchableOpacity>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40, // Added padding to avoid overlap with the tab bar
    marginBottom: 40
  },
  header: {
    padding: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 4,
  },
  categories: {
    paddingHorizontal: 20,
    gap: 4,
    marginBottom: 0, // Changed from 8 to 0
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40, // Altura fixa para todos os botões
  },
  categoryButtonActive: {
    backgroundColor: '#1a1a1a',
    height: 40, // Mesma altura do botão inativo
    // Mantenha o restante do estilo para destaque
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    // Remova o lineHeight para evitar inconsistências
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    // textAlign: 'center',
  },
//   categoryTextActive: {
//   color: '#fff',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   lineHeight: 16, // Garante que o texto não estique o botão
// },
  products: {
    paddingHorizontal: 24,
    paddingTop: 16,  // Reduced from 24
    paddingBottom: 24,
    gap: 24,
  },
  productCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});