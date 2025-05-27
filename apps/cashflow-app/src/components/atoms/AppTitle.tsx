import { Box, Text } from "@chakra-ui/react";

export interface AppTitleProps {
  title: string;
  subtitle?: string;
}

export function AppTitle({ title, subtitle }: AppTitleProps) {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" color="white">{title}</Text>
      {subtitle && <Text fontSize="sm" color="gray.400">{subtitle}</Text>}
    </Box>
  );
}
