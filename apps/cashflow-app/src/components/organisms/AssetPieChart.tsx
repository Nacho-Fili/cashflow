import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface AssetPieChartData {
  name: string;
  value: number;
  color: string;
}

export interface AssetPieChartProps {
  data: AssetPieChartData[];
}

export function AssetPieChart({ data }: AssetPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
