import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

import { Container } from "@/components/Container";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { THEME } from "@/theme";
import { styles } from "./styles";

type StatusFilter = "all" | "Pending" | "In Progress" | "Completed";

function getStatusLabel(status: StatusFilter | string) {
  switch (status) {
    case "Pending":
      return "Pending";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Completed";
    case "all":
      return "All";
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
      name: "Pending",
      population: pendingCount,
      color: THEME.colors.warning,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
    {
      name: "In Progress",
      population: inProgressCount,
      color: THEME.colors.primary,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
    {
      name: "Completed",
      population: completedCount,
      color: THEME.colors.success,
      legendFontColor: THEME.colors.text,
      legendFontSize: 12,
    },
  ].filter((item) => item.population > 0);

  const chartWidth = Dimensions.get("window").width - 32;

  return (
    <Container loading={loading} backgroundColor={THEME.colors.background}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INMETA</Text>
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>
            Analyze local work orders stored in Realm with filters by technician
            and status.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{filteredItems.length}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Technicians</Text>
            <Text style={styles.summaryValue}>
              {technicians.length > 0 ? technicians.length - 1 : 0}
            </Text>
          </View>
        </View>

        <View style={styles.filtersCard}>
          <Text style={styles.cardTitle}>Filters</Text>

          <Text style={styles.filterLabel}>Technician</Text>
          <View style={styles.chipsWrap}>
            {technicians.map((technician) => {
              const selected = selectedTechnician === technician;

              return (
                <TouchableOpacity
                  key={technician}
                  activeOpacity={0.88}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => setSelectedTechnician(technician)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {technician === "all" ? "All" : technician}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

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
          <Text style={styles.cardTitle}>Status distribution</Text>

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
                No data available for the selected filters.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metricsCard}>
          <Text style={styles.cardTitle}>Metrics</Text>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Pending</Text>
            <Text style={styles.metricValue}>{pendingCount}</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>In Progress</Text>
            <Text style={styles.metricValue}>{inProgressCount}</Text>
          </View>

          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Completed</Text>
            <Text style={styles.metricValue}>{completedCount}</Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
