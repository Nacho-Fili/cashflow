'use client';

import React, { useState } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { MetricCard } from "../organisms/MetricCard";
import { ChartSection } from "../organisms/ChartSection";
import { TransactionTable } from "../organisms/TransactionTable";
import {
  WalletIcon,
  TrendingUpIcon,
  CreditCardIcon,
  PiggyBankIcon,
} from "lucide-react";
import { chakra, Box } from "@chakra-ui/react";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const metrics: import("../organisms/MetricCard").MetricCardProps[] = [
    {
      title: "Balance Total",
      value: "$45,230.50",
      change: "+12.5%",
      changeType: "positive",
      icon: WalletIcon,
      color: "blue",
    },
    {
      title: "Inversiones",
      value: "$28,450.00",
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUpIcon,
      color: "green",
    },
    {
      title: "Deudas",
      value: "$5,230.00",
      change: "-15.3%",
      changeType: "negative",
      icon: CreditCardIcon,
      color: "red",
    },
    {
      title: "Ahorros",
      value: "$12,550.75",
      change: "+5.7%",
      changeType: "positive",
      icon: PiggyBankIcon,
      color: "purple",
    },
  ];
  return (
    <Box display="flex" minH="100vh" bg="#111827">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Box as="main" flex={1} p={6} ml="256px">
        <Box maxW="1280px" mx="auto">
          {/* Header */}
          <Box mb={8}>
            <chakra.h1 fontSize="2xl" fontWeight="bold" color="white" mb={2}>
              Dashboard Financiero
            </chakra.h1>
            <chakra.p color="#9CA3AF">Resumen de tu situación financiera</chakra.p>
          </Box>
          {/* Metrics Grid */}
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6} mb={8}>
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </Box>
          {/* Charts Section */}
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={6} mb={8}>
            <ChartSection />
          </Box>
          {/* Recent Transactions */}
          <Box bg="#1F2937" borderRadius="xl" p={6}>
            <chakra.h2 fontSize="lg" fontWeight={600} color="white" mb={4}>
              Transacciones Recientes
            </chakra.h2>
            <TransactionTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
