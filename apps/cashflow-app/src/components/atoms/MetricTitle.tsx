import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export function MetricTitle(props: TextProps) {
  return (
    <Text fontSize="sm" color="gray.400" fontWeight="medium" mb={1} {...props} />
  );
}
