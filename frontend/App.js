import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import HomeScreen from './screens/HomeScreen';
import SchoolLifeScreen from './screens/SchoolLifeScreen';
import CommunityScreen from './screens/CommunityScreen';
import MyPageScreen from './screens/MyPageScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import LoginScreen from './screens/LoginScreen';
import PostDetailScreen from './screens/PostDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SchoolLife') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'MyPage') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '홈' }}
      />
      <Tab.Screen
        name="SchoolLife"
        component={SchoolLifeScreen}
        options={{ title: '학교생활' }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ title: '커뮤니티' }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
      />
    </Tab.Navigator>
  );
}

const AppNav = () => {
  const { isLoading, userToken } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
