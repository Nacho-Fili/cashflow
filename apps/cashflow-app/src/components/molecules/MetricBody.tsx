'use client';

import { VStack } from "@chakra-ui/react";
import { MetricTitle } from "../atoms/MetricTitle";
import { MetricValue } from "../atoms/MetricValue";
import * as React from "react";

export interface MetricBodyProps {
  title: string;
  value: string;
}

export function MetricBody({ title, value }: MetricBodyProps) {
  return (
    <VStack alignItems="flex-start" gap={0}>
      <MetricTitle>{title}</MetricTitle>
      <MetricValue>{value}</MetricValue>
    </VStack>
  );
}
