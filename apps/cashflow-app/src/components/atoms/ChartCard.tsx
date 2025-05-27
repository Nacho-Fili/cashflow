import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

export function ChartCard(props: BoxProps) {
  return (
    <Box bg="gray.800" borderRadius="xl" p={6} borderWidth={1} borderColor="gray.700" {...props} />
  );
}
