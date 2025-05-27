'use client';

import { chakra, HStack, VStack } from "@chakra-ui/react";
import * as React from "react";
import { CategoryIconBox } from "../atoms/CategoryIconBox";
import { TransactionDescription } from "../atoms/TransactionDescription";
import { TransactionCellText } from "../atoms/TransactionCellText";
import { TransactionAmount } from "../atoms/TransactionAmount";

export interface TransactionRowProps {
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
  icon: React.ElementType;
}

export function TransactionRow({ description, amount, type, date, category, icon: Icon }: TransactionRowProps) {
  return (
    <chakra.tr borderBottom="1px solid" borderColor="gray.700">
      <chakra.td py={4} px={4}>
        <HStack gap={3}>
          <CategoryIconBox icon={<Icon size={20} />} colorScheme={type === "income" ? "green" : "gray"} />
          <VStack alignItems="flex-start" gap={0}>
            <TransactionDescription>{description}</TransactionDescription>
          </VStack>
        </HStack>
      </chakra.td>
      <chakra.td py={4} px={4}>
        <TransactionCellText>{category}</TransactionCellText>
      </chakra.td>
      <chakra.td py={4} px={4}>
        <TransactionCellText>{date}</TransactionCellText>
      </chakra.td>
      <chakra.td py={4} px={4} textAlign="right">
        <TransactionAmount amount={amount} type={type} />
      </chakra.td>
    </chakra.tr>
  );
}
