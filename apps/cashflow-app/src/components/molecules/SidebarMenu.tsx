import { VStack } from "@chakra-ui/react";
import { IconButton } from "../atoms/IconButton";
import { HomeIcon, WalletIcon, TrendingUpIcon, CreditCardIcon, PieChartIcon } from "lucide-react";

interface SidebarMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "overview", label: "Resumen", icon: <HomeIcon /> },
  { id: "accounts", label: "Cuentas", icon: <WalletIcon /> },
  { id: "investments", label: "Inversiones", icon: <TrendingUpIcon /> },
  { id: "debts", label: "Deudas", icon: <CreditCardIcon /> },
  { id: "analytics", label: "Análisis", icon: <PieChartIcon /> },
];

export function SidebarMenu({ activeSection, setActiveSection }: SidebarMenuProps) {
  return (
    <VStack as="nav" gap={2} alignItems="stretch">
      {menuItems.map((item) => (
        <IconButton
          key={item.id}
          icon={item.icon}
          label={item.label}
          onClick={() => setActiveSection(item.id)}
          bg={activeSection === item.id ? "blue.600" : undefined}
          color={activeSection === item.id ? "white" : "gray.300"}
          _hover={{ bg: activeSection === item.id ? "blue.700" : "gray.700", color: "white" }}
        />
      ))}
    </VStack>
  );
}
