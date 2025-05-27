import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export function MetricValue(props: TextProps) {
  return (
    <Text fontSize="2xl" fontWeight="bold" color="white" {...props} />
  );
}
