import { ChartCard } from "../atoms/ChartCard";
import { ChartTitle } from "../atoms/ChartTitle";
import { BalanceLineChart } from "./BalanceLineChart";
import { AssetPieChart } from "./AssetPieChart";
import { ChartLegend } from "../molecules/ChartLegend";
import * as React from "react";

const lineData = [
  { month: "Ene", balance: 32000 },
  { month: "Feb", balance: 35000 },
  { month: "Mar", balance: 38000 },
  { month: "Abr", balance: 42000 },
  { month: "May", balance: 45000 },
  { month: "Jun", balance: 45230 },
];

const pieData = [
  { name: "Cuentas Bancarias", value: 45, color: "#3B82F6" },
  { name: "Inversiones", value: 35, color: "#10B981" },
  { name: "Efectivo", value: 15, color: "#8B5CF6" },
  { name: "Otros", value: 5, color: "#F59E0B" },
];

export function ChartSection() {
  return (
    <>
      <ChartCard mb={6}>
        <ChartTitle>Evolución del Balance</ChartTitle>
        <div style={{ height: 256 }}>
          <BalanceLineChart data={lineData} />
        </div>
      </ChartCard>
      <ChartCard>
        <ChartTitle>Distribución de Activos</ChartTitle>
        <div style={{ height: 256 }}>
          <AssetPieChart data={pieData} />
        </div>
        <ChartLegend data={pieData} />
      </ChartCard>
    </>
  );
}
