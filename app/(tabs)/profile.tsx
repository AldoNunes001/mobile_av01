import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

// FIREBASE AUTHENTICATION
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

const MENU_ITEMS = [
  {
    icon: Package,
    label: 'Orders',
    value: '12 orders',
  },
  {
    icon: CreditCard,
    label: 'Payment Methods',
    value: '2 cards',
  },
  {
    icon: MapPin,
    label: 'Addresses',
    value: '3 addresses',
  },
  {
    icon: Bell,
    label: 'Notifications',
    value: 'On',
  },
  {
    icon: Settings,
    label: 'Settings',
  },
];

const user = auth.currentUser;

//FIREBASE AUTHENTICATION
export default function Profile() {
  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/(auth)/login'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={32} color="#666" />
          </View>
          <View>
            <Text style={styles.userName}>{user?.displayName || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index === MENU_ITEMS.length - 1 && styles.menuItemLast,
              ]}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <item.icon size={20} color="#666" />
                </View>
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && (
                  <Text style={styles.menuItemValue}>{item.value}</Text>
                )}
                <ChevronRight size={20} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  menuItemLast: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
});