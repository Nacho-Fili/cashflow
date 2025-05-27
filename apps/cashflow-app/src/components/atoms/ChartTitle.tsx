import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export function ChartTitle(props: TextProps) {
  return (
    <Text fontSize="lg" fontWeight="semibold" color="white" mb={4} {...props} />
  );
}
