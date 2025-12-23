import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SchoolLifeScreen from './screens/SchoolLifeScreen';
import CommunityScreen from './screens/CommunityScreen';
import MyPageScreen from './screens/MyPageScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
    </NavigationContainer>
  );
}
