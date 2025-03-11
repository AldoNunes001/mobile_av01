import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon } from 'lucide-react-native';

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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.results}
      >
        {filteredProducts.map(product => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  results: {
    padding: 24,
    gap: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
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
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});