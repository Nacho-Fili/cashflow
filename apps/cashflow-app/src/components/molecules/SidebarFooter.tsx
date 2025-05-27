import { VStack } from "@chakra-ui/react";
import { IconButton } from "../atoms/IconButton";
import { SettingsIcon, LogOutIcon } from "lucide-react";

export function SidebarFooter() {
  return (
    <VStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      p={6}
      borderTopWidth={1}
      borderColor="gray.700"
      gap={2}
      alignItems="stretch"
    >
      <IconButton
        icon={<SettingsIcon />}
        label="Configuración"
        color="gray.300"
        _hover={{ bg: "gray.700", color: "white" }}
      />
      <IconButton
        icon={<LogOutIcon />}
        label="Cerrar Sesión"
        color="gray.300"
        _hover={{ bg: "gray.700", color: "white" }}
      />
    </VStack>
  );
}
