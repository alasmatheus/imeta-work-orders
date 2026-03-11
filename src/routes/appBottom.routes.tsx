import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";

import { HeaderBackButton } from "@/components/HeaderBackButton";
import { THEME } from "@theme/index";

// Routes
import { FloatingAddTabButton } from "@/components/FloatingAddTabButton";
import { Add } from "@ui/screens/Add";
import { Edit } from "@ui/screens/Edit";
import { Home } from "@ui/screens/Home";
import { Report } from "@ui/screens/Reports";

export type AppRoutes = {
  home: undefined;
  add: undefined;
  edit: { id: string };
  report: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const iconSize = 22;

export function AppBottomRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: true,
        headerRight: () => null,
        headerLeft: () => <HeaderBackButton />,
        headerShadowVisible: false,
        headerTintColor: THEME.colors.text,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontFamily: THEME.fonts.bold,
          fontSize: 20,
          textAlign: "center",
        },
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarStyle: {
          backgroundColor: THEME.colors.card,
          borderTopWidth: 0,
          height: Platform.OS === "ios" ? 84 : 74,
          paddingBottom: Platform.OS === "ios" ? 18 : 10,
          paddingTop: 8,
          shadowColor: THEME.colors.black,
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: THEME.fonts.body,
        },
      }}
      backBehavior="history"
    >
      <Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={iconSize}
              color={focused ? THEME.colors.primary : THEME.colors.textMuted}
            />
          ),
        }}
      />

      <Screen
        name="add"
        component={Add}
        options={{
          title: "Adicionar",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: () => null,
          tabBarButton: (props) => (
            <FloatingAddTabButton onPress={props.onPress} />
          ),
        }}
      />

      <Screen
        name="report"
        component={Report}
        options={{
          title: "Relatórios",
          headerShown: false,
          tabBarLabel: "Reports",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="bar-chart"
              size={iconSize}
              color={focused ? THEME.colors.primary : THEME.colors.textMuted}
            />
          ),
        }}
      />

      <Screen
        name="edit"
        component={Edit}
        options={{
          title: "Edição",
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
