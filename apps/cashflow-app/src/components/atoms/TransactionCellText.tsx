import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export function TransactionCellText(props: TextProps) {
  return <Text color="gray.300" fontSize="sm" {...props} />;
}
