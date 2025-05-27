import { HStack } from "@chakra-ui/react";
import { AppLogo } from "../atoms/AppLogo";
import { AppTitle } from "../atoms/AppTitle";

export function BrandHeader() {
  return (
    <HStack gap={3} mb={8} alignItems="center">
      <AppLogo />
      <AppTitle title="FinanceApp" subtitle="Tu dinero, tu control" />
    </HStack>
  );
}
