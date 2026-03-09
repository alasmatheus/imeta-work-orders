import { HeaderBackButton } from "@/components/HeaderBackButton";
import { FontAwesome } from "@expo/vector-icons";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { THEME } from "@theme/index";
import React from "react";

//Routes
import { Home } from "@ui/screens/Home";

export type AppRoutes = {
  home: undefined;
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
    </Navigator>
  );
}
