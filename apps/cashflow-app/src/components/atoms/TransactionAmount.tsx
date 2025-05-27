import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";

export interface TransactionAmountProps extends TextProps {
  amount: number;
  type: "income" | "expense";
}

export function TransactionAmount({ amount, type, ...props }: TransactionAmountProps) {
  const color = type === "income" ? "green.400" : "red.400";
  const prefix = type === "income" ? "+" : "";
  return (
    <Text fontWeight="semibold" color={color} {...props}>
      {prefix}${Math.abs(amount).toFixed(2)}
    </Text>
  );
}
