import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { HeaderBackButton } from "@/components/HeaderBackButton";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { THEME } from "@theme/index";
import React from "react";

//Routes
import { Add } from "@ui/screens/Add";
import { Edit } from "@ui/screens/Edit";
import { Home } from "@ui/screens/Home";

export type AppRoutes = {
  home: undefined;
  add: undefined;
  edit: string;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppBottomRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: true,
        headerRight: () => null,
        headerLeft: () => <HeaderBackButton />,
        headerShadowVisible: false,
        headerTintColor: THEME.colors.black,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontFamily: THEME.fonts.bold,
          fontSize: 20,
          textAlign: "center",
        },
        tabBarActiveTintColor: THEME.colors.green800,
        tabBarInactiveTintColor: THEME.colors.gray600,
        tabBarStyle: {
          backgroundColor: THEME.colors.white,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 10,
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
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? THEME.colors.green800 : THEME.colors.gray600}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: THEME.fonts.body,
          },
        }}
      />

      <Screen
        name="add"
        component={Add}
        options={{
          title: "Adicionar",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="plus"
              size={24}
              color={focused ? THEME.colors.green800 : THEME.colors.gray600}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: THEME.fonts.body,
          },
        }}
      />

      {/* Rotas “ocultas” sem botão na tab bar */}
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
