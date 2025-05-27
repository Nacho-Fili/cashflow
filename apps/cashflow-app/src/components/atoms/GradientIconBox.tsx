'use client'

import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

export interface GradientIconBoxProps extends BoxProps {
  icon: React.ReactNode;
  gradient: string;
}

export function GradientIconBox({ icon, gradient, ...props }: GradientIconBoxProps) {
  return (
    <Box
      w={12}
      h={12}
      bgGradient={gradient}
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {icon}
    </Box>
  );
}
