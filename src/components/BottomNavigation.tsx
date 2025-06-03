import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react-native';

export default function BottomNavigation() {
  const pathname = usePathname();

  const items = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/cart') {
      return pathname === '/cart' || pathname === '/checkout';
    }
    return pathname === path;
  };

  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          key={item.path}
          style={styles.item}
          onPress={() => router.replace(item.path)}
        >
          <item.icon
            size={24}
            color={isActive(item.path) ? '#1a1a1a' : '#666'}
          />
          <Text
            style={[
              styles.label,
              { color: isActive(item.path) ? '#1a1a1a' : '#666' },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#f1f1f1',
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  item: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
  },
});
