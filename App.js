import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Screens imports
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import CourseVideoScreen from './screens/CourseVideoScreen';
import ApplyGuideScreen from './screens/ApplyGuideScreen';
import AboutScreen from './screens/AboutScreen';
import CertificateScreen from './screens/CertificateScreen';
import ApplyNowScreen from './screens/ApplyNowScreen';
import QuizScreen from './screens/QuizScreen';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E1BEE7',
        tabBarInactiveTintColor: '#D1C4E9',
        tabBarIndicatorStyle: { backgroundColor: '#9C27B0' },
        tabBarStyle: { backgroundColor: '#6A0DAD' },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
        tabBarPressColor: '#CE93D8',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CourseScreen} />
      <Tab.Screen name="How to Apply Online?" component={ApplyGuideScreen} />
      <Tab.Screen name="About Us" component={AboutScreen} />
      <Tab.Screen name="Apply Now" component={ApplyNowScreen} />
    </Tab.Navigator>
  );
}

function DrawerMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#f5f5f5' },
        headerStyle: { backgroundColor: '#6A0DAD' },
        headerTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Courses" component={CourseScreen} />
      <Drawer.Screen name="How to Apply Online?" component={ApplyGuideScreen} />
      <Drawer.Screen name="About Us" component={AboutScreen} />
      <Drawer.Screen name="Apply Now" component={ApplyNowScreen} />
    </Drawer.Navigator>
  );
}

function MainApp() {
  const { width } = useWindowDimensions();
  return width > 768 ? <TopTabs /> : <DrawerMenu />;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate splash screen loading for 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => <SignupScreen {...props} onSignup={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainApp} />
            <Stack.Screen
              name="CourseVideos"
              component={CourseVideoScreen}
              options={{
                headerShown: true,
                title: 'Course Videos',
                headerStyle: { backgroundColor: '#6A0DAD' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{
                headerShown: true,
                title: 'Quiz',
                headerStyle: { backgroundColor: '#6A0DAD' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="CertificateScreen"
              component={CertificateScreen}
              options={{
                headerShown: true,
                title: 'Certificate',
                headerStyle: { backgroundColor: '#6A0DAD' },
                headerTintColor: 'white',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
