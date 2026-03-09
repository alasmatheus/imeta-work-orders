// App.tsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";

import { Container } from "@/components/Container";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
    Raleway_600SemiBold,
    Raleway_500Medium,
    Raleway_300Light,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "right", "left", "bottom"]}
      >
        <Container loading={!fontsLoaded}>
          <StatusBar hidden />
          <Routes />
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
