import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

export interface ChartLegendDotProps extends BoxProps {
  color: string;
}

export function ChartLegendDot({ color, ...props }: ChartLegendDotProps) {
  return <Box w={3} h={3} borderRadius="full" bg={color} {...props} />;
}
