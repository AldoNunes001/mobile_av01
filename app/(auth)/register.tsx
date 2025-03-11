import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, ArrowRight } from 'lucide-react-native';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#666" style={styles.inputIcon} />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Full name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" style={styles.inputIcon} />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Create Account</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/login" style={styles.link}>
            Sign in
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: -8,
    marginLeft: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    height: 56,
    marginTop: 8,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  link: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '600',
  },
});