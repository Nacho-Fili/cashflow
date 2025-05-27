import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

export interface CategoryIconBoxProps extends BoxProps {
  icon: React.ReactNode;
  colorScheme?: "green" | "gray";
}

export function CategoryIconBox({ icon, colorScheme = "gray", ...props }: CategoryIconBoxProps) {
  const bg = colorScheme === "green" ? "green.500Alpha.200" : "gray.600";
  const color = colorScheme === "green" ? "green.400" : "gray.300";
  return (
    <Box
      w={10}
      h={10}
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
      {...props}
    >
      {icon}
    </Box>
  );
}
