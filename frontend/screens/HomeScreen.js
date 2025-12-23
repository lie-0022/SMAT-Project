import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import client from '../src/api/client';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [healthStatus, setHealthStatus] = useState({ message: 'Checking backend...', isError: false, isLoading: true });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await client.get('/api/health'); // Assuming endpoint returns plain text or JSON
        // Adjust based on actual string response or object. 
        // User request says: "Backend is Active!" message. 
        // If the backend returns that string directly:
        setHealthStatus({ message: 'Backend is Active!', isError: false, isLoading: false });
      } catch (error) {
        console.error("Health check failed:", error);
        setHealthStatus({ message: 'Backend Connection Failed', isError: true, isLoading: false });
      }
    };
    checkHealth();
  }, []);
  // Mock Data
  const currentDate = "11월 29일 금요일"; // Fixed date as per request example/context
  const userName = "백석";

  const weatherData = {
    location: "천안시 안서동",
    condition: "맑음",
    temp: "12°C",
    message: "오늘 쌀쌀해요, 겉옷 챙기세요!",
  };

  const nextClass = {
    hasClassName: true,
    text: "⏳ 곧 시작하는 수업: 자료구조 (14:00)",
  };
  // Alternative for no class:
  // const nextClass = { hasClassName: false, text: "오늘 수업 끝! 자유시간을 즐기세요 🎉" };

  const lunchMenu = {
    title: "🍴 오늘 점심: 왕돈까스 & 우동 (학생식당)",
  };

  const quickActions = [
    { id: 1, title: '셔틀버스', icon: 'bus', color: '#4A90E2' },
    { id: 2, title: '도서관', icon: 'library', color: '#66BB6A' },
    { id: 3, title: '공지사항', icon: 'megaphone', color: '#FFA726' },
    { id: 4, title: '교내전화', icon: 'call', color: '#EF5350' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Backend Health Status */}
        <View style={[styles.card, { alignItems: 'center', marginBottom: 20, backgroundColor: healthStatus.isError ? '#FFEBEE' : '#E8F5E9' }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: healthStatus.isError ? '#D32F2F' : '#388E3C' }}>
            {healthStatus.message}
          </Text>
        </View>

        {/* 1. Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>안녕하세요, {userName}님! 👋</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {/* 2. Weather Card */}
        <View style={styles.card}>
          <View style={styles.weatherRow}>
            <Ionicons name="sunny" size={40} color="#FFB300" style={styles.weatherIcon} />
            <View>
              <Text style={styles.weatherLocation}>
                {weatherData.location} | {weatherData.condition} {weatherData.temp}
              </Text>
              <Text style={styles.weatherMessage}>{weatherData.message}</Text>
            </View>
          </View>
        </View>

        {/* 3. Quick Actions (Grid) */}
        <View style={styles.section}>
          <View style={styles.gridContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.gridItem}>
                <View style={[styles.iconCircle, { backgroundColor: `${action.color}20` }]}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.gridLabel}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4. Coming Up (Next Class) */}
        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.highlightText}>{nextClass.text}</Text>
        </View>

        {/* 5. Today's Pick (Cafeteria) */}
        <View style={styles.card}>
          <Text style={styles.cafeteriaText}>{lunchMenu.title}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF', // Light background color
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    marginRight: 16,
  },
  weatherLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  weatherMessage: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 40) / 4 - 10, // 4 items per row with spacing
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  highlightCard: {
    backgroundColor: '#E3F2FD', // Slightly highlighted background for next class
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  cafeteriaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;
