import { VStack } from "@chakra-ui/react";
import { ChartLegendItem } from "./ChartLegendItem";
import * as React from "react";

export interface ChartLegendData {
  name: string;
  value: number;
  color: string;
}

export interface ChartLegendProps {
  data: ChartLegendData[];
}

export function ChartLegend({ data }: ChartLegendProps) {
  return (
    <VStack mt={4} alignItems="stretch" gap={2}>
      {data.map((item, idx) => (
        <ChartLegendItem key={idx} color={item.color} name={item.name} value={item.value} />
      ))}
    </VStack>
  );
}
