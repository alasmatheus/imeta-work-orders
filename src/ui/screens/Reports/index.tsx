import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { PieChart } from "react-native-chart-kit";

import { Container } from "@/components/Container";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { THEME } from "@/theme";
import { TechnicianSelectModal } from "./componentes/TechnicianSelectModal";
import { styles } from "./styles";

type StatusFilter = "all" | "Pending" | "In Progress" | "Completed";

function getStatusLabel(status: StatusFilter | string) {
  switch (status) {
    case "Pending":
      return "Pendente";
    case "In Progress":
      return "Em andamento";
    case "Completed":
      return "Concluído";
    case "all":
      return "Todos";
    default:
      return status;
  }
}

const chartConfig = {
  backgroundGradientFrom: THEME.colors.card,
  backgroundGradientTo: THEME.colors.card,
  color: () => THEME.colors.text,
  labelColor: () => THEME.colors.text,
  decimalPlaces: 0,
};

export function Report() {
  const items = useWorkOrdersStore((state) => state.items);
  const loadWorkOrders = useWorkOrdersStore((state) => state.loadWorkOrders);
  const loading = useWorkOrdersStore((state) => state.loading);

  const [selectedTechnician, setSelectedTechnician] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState(false);

  useEffect(() => {
    loadWorkOrders();
  }, [loadWorkOrders]);

  const technicians = useMemo(() => {
    const uniqueNames = Array.from(
      new Set(
        items
          .map((item) => item.assignedTo?.trim())
          .filter((value) => Boolean(value)),
      ),
    );

    return ["all", ...uniqueNames];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const technicianMatch =
        selectedTechnician === "all" || item.assignedTo === selectedTechnician;

      const statusMatch =
        selectedStatus === "all" || item.status === selectedStatus;

      return technicianMatch && statusMatch;
    });
  }, [items, selectedTechnician, selectedStatus]);

  const pendingCount = filteredItems.filter(
    (item) => item.status === "Pending",
  ).length;

  const inProgressCount = filteredItems.filter(
    (item) => item.status === "In Progress",
  ).length;

  const completedCount = filteredItems.filter(
    (item) => item.status === "Completed",
  ).length;

  const chartData = [
    {
      name: "Pendente",
      population: pendingCount,
      color: THEME.colors.warning,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
    {
      name: "Em andamento",
      population: inProgressCount,
      color: THEME.colors.primary,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
    {
      name: "Concluído",
      population: completedCount,
      color: THEME.colors.success,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
  ].filter((item) => item.population > 0);

  const chartWidth = Dimensions.get("window").width - 32;

  const technicianLabel =
    selectedTechnician === "all" ? "Todos" : selectedTechnician;

  return (
    <Container loading={loading} backgroundColor={THEME.colors.background}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INMETA</Text>
          <Text style={styles.title}>Relatórios</Text>
          <Text style={styles.subtitle}>Analise as ordens</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{filteredItems.length}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Técnicos</Text>
            <Text style={styles.summaryValue}>
              {technicians.length > 0 ? technicians.length - 1 : 0}
            </Text>
          </View>
        </View>

        <View style={styles.filtersCard}>
          <Text style={styles.cardTitle}>Filtros</Text>

          <Text style={styles.filterLabel}>Técnico</Text>
          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.selectButton}
            onPress={() => setIsTechnicianModalOpen(true)}
          >
            <Text style={styles.selectButtonText}>{technicianLabel}</Text>
            <Feather
              name="chevron-down"
              size={18}
              color={THEME.colors.textMuted}
            />
          </TouchableOpacity>

          <Text style={styles.filterLabel}>Status</Text>
          <View style={styles.chipsWrap}>
            {(
              ["all", "Pending", "In Progress", "Completed"] as StatusFilter[]
            ).map((status) => {
              const selected = selectedStatus === status;

              return (
                <TouchableOpacity
                  key={status}
                  activeOpacity={0.88}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => setSelectedStatus(status)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {getStatusLabel(status)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Distribuição por status</Text>

          {chartData.length > 0 ? (
            <PieChart
              data={chartData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="8"
              absolute
              hasLegend
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyChartText}>
                Não há dados disponíveis para os filtros selecionados.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metricsCard}>
          <Text style={styles.cardTitle}>Métricas</Text>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Pendentes</Text>
            <Text style={styles.metricValue}>{pendingCount}</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Em andamento</Text>
            <Text style={styles.metricValue}>{inProgressCount}</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Concluídos</Text>
            <Text style={styles.metricValue}>{completedCount}</Text>
          </View>
        </View>
      </ScrollView>

      <TechnicianSelectModal
        visible={isTechnicianModalOpen}
        technicians={technicians}
        selectedTechnician={selectedTechnician}
        onClose={() => setIsTechnicianModalOpen(false)}
        onSelect={setSelectedTechnician}
      />
    </Container>
  );
}
