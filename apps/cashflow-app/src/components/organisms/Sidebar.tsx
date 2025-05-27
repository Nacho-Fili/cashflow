'use client';

import React from "react";
import { BrandHeader } from "../molecules/BrandHeader";
import { SidebarMenu } from "../molecules/SidebarMenu";
import { SidebarFooter } from "../molecules/SidebarFooter";
import { Box } from "@chakra-ui/react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="256px"
      bg="gray.800"
      borderRight="1px solid"
      borderColor="gray.700"
      display="flex"
      flexDirection="column"
    >
      <Box p={6} flexGrow={1}>
        <BrandHeader />
        <SidebarMenu activeSection={activeSection} setActiveSection={setActiveSection} />
      </Box>
      <SidebarFooter />
    </Box>
  );
}
