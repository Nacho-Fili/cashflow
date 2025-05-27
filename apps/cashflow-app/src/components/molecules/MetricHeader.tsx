'use client';

import { HStack } from "@chakra-ui/react";
import { GradientIconBox } from "../atoms/GradientIconBox";
import { MetricChange } from "../atoms/MetricChange";
import * as React from "react";

export interface MetricHeaderProps {
  icon: React.ReactNode;
  gradient: string;
  change: string;
  changeType: 'positive' | 'negative';
}

export function MetricHeader({ icon, gradient, change, changeType }: MetricHeaderProps) {
  return (
    <HStack justifyContent="space-between" mb={4}>
      <GradientIconBox icon={icon} gradient={gradient} />
      <MetricChange value={change} type={changeType} />
    </HStack>
  );
}
