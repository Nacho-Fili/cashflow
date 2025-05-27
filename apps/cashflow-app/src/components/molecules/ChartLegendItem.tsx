import { HStack, Text } from "@chakra-ui/react";
import { ChartLegendDot } from "../atoms/ChartLegendDot";
import * as React from "react";

export interface ChartLegendItemProps {
  color: string;
  name: string;
  value: number;
}

export function ChartLegendItem({ color, name, value }: ChartLegendItemProps) {
  return (
    <HStack justifyContent="space-between" w="full">
      <HStack gap={2}>
        <ChartLegendDot color={color} />
        <Text fontSize="sm" color="gray.300">{name}</Text>
      </HStack>
      <Text fontSize="sm" fontWeight="medium" color="white">{value}%</Text>
    </HStack>
  );
}
