'use client';

import { chakra } from "@chakra-ui/react";
import * as React from "react";
import { TransactionRow } from "../molecules/TransactionRow";
import {
  ArrowUpIcon,
  HomeIcon,
  CarIcon,
  CoffeeIcon,
  ShoppingCartIcon,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Salario - Empresa XYZ",
    amount: 4500.0,
    type: "income",
    date: "2024-01-15",
    category: "Salario",
    icon: ArrowUpIcon,
  },
  {
    id: 2,
    description: "Supermercado Central",
    amount: -150.75,
    type: "expense",
    date: "2024-01-14",
    category: "Alimentación",
    icon: ShoppingCartIcon,
  },
  {
    id: 3,
    description: "Alquiler Apartamento",
    amount: -1200.0,
    type: "expense",
    date: "2024-01-01",
    category: "Vivienda",
    icon: HomeIcon,
  },
  {
    id: 4,
    description: "Gasolina Shell",
    amount: -65.3,
    type: "expense",
    date: "2024-01-13",
    category: "Transporte",
    icon: CarIcon,
  },
  {
    id: 5,
    description: "Café & Co",
    amount: -12.5,
    type: "expense",
    date: "2024-01-12",
    category: "Entretenimiento",
    icon: CoffeeIcon,
  },
];

export function TransactionTable() {
  return (
    <chakra.div w="full" overflowX="auto">
      <chakra.table w="full">
        <chakra.thead fontSize="sm">
          <chakra.tr borderBottom="1px solid" borderColor="gray.700">
            <chakra.th textAlign="left" py={3} px={4} color="gray.400" fontWeight="medium">Descripción</chakra.th>
            <chakra.th textAlign="left" py={3} px={4} color="gray.400" fontWeight="medium">Categoría</chakra.th>
            <chakra.th textAlign="left" py={3} px={4} color="gray.400" fontWeight="medium">Fecha</chakra.th>
            <chakra.th textAlign="right" py={3} px={4} color="gray.400" fontWeight="medium">Monto</chakra.th>
          </chakra.tr>
        </chakra.thead>
        <chakra.tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type as "income" | "expense"}
              date={transaction.date}
              category={transaction.category}
              icon={transaction.icon}
            />
          ))}
        </chakra.tbody>
      </chakra.table>
    </chakra.div>
  );
}
