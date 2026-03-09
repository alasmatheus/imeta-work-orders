import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import { AppBottomRoutes } from "./appBottom.routes";

export function Routes() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AppBottomRoutes />
      </NavigationContainer>
    </View>
  );
}
