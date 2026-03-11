import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";

import { CustomTabBar } from "@/components/CustomTabBar";
import { HeaderBackButton } from "@/components/HeaderBackButton";
import { THEME } from "@theme/index";

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

export function AppBottomRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
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
      }}
      backBehavior="history"
    >
      <Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />

      <Screen
        name="add"
        component={Add}
        options={{
          title: "Adicionar",
          headerShown: false,
        }}
      />

      <Screen
        name="report"
        component={Report}
        options={{
          title: "Relatórios",
          headerShown: false,
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
