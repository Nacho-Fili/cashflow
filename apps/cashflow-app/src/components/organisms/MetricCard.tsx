'use client';

import { Box } from "@chakra-ui/react";
import { MetricHeader } from "../molecules/MetricHeader";
import { MetricBody } from "../molecules/MetricBody";
import * as React from "react";

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType;
  color: "blue" | "green" | "red" | "purple";
}

const colorGradients: Record<string, string> = {
  blue: "linear(to-r, blue.500, blue.600)",
  green: "linear(to-r, green.500, green.600)",
  red: "linear(to-r, red.500, red.600)",
  purple: "linear(to-r, purple.500, purple.600)",
};

export function MetricCard({ title, value, change, changeType, icon, color }: MetricCardProps) {
  return (
    <Box bg="gray.800" borderRadius="xl" p={6} borderWidth={1} borderColor="gray.700" _hover={{ borderColor: "gray.600" }} transition="colors 0.2s">
      <MetricHeader icon={React.createElement(icon, { size: 24 })} gradient={colorGradients[color]} change={change} changeType={changeType} />
      <MetricBody title={title} value={value} />
    </Box>
  );
}
