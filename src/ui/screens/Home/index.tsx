import { useEffect } from "react";
import { Text, View } from "react-native";

import { Container } from "@components/Container";
import { useWorkOrdersStore } from "@stores/workOrders.store";

export function Home() {
  const items = useWorkOrdersStore((state) => state.items);
  const loading = useWorkOrdersStore((state) => state.loading);
  const loadFromRealm = useWorkOrdersStore((state) => state.loadFromRealm);

  useEffect(() => {
    loadFromRealm();
  }, [loadFromRealm]);

  return (
    <Container loading={loading}>
      <View>
        <Text>Ordens de serviço</Text>
        <Text>Total: {items.length}</Text>
      </View>
    </Container>
  );
}
