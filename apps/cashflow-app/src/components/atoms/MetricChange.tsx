'use client'

import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export interface MetricChangeProps extends TextProps {
  value: string;
  type: 'positive' | 'negative';
}

export function MetricChange({ value, type, ...props }: MetricChangeProps) {
  const color = type === 'positive' ? 'green.400' : 'red.400';
  return (
    <Text fontSize="sm" fontWeight="medium" color={color} {...props}>
      {value}
    </Text>
  );
}
