import "@expo/metro-runtime";
import { faHouse, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { HomeScreen } from "./src/components/Home/HomeScreen";
import { LoginScreen } from "./src/components/Login/LoginScreen";
import { ProfileScreen } from "./src/components/Profile/ProfileScreen";
import { RegisterScreen } from "./src/components/Register/RegisterScreen";
import { RouteScreen } from "./src/components/Route/RouteScreen";
import { Accent, AccentLight, Main, Secondary } from "./assets/colors";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Accent,
          height: 78,
          alignItems: "center"
        },
        headerShown: false,
        tabBarActiveTintColor: Main,
        tabBarInactiveTintColor: AccentLight,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faHouse} color={color} size={30} />) }}
      />
      <Tab.Screen name="Rotas" component={RouteScreen}
        options={{ tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faPlus} color={color} size={30} />) }}
      />
      <Tab.Screen name="Perfil" component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faUser} color={color} size={30} />) }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Autocadastro" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}