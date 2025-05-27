import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export function TransactionDescription(props: TextProps) {
  return <Text fontWeight="medium" color="white" {...props} />;
}
