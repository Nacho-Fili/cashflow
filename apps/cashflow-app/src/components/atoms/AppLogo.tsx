import { Box } from "@chakra-ui/react";
import { WalletIcon } from "lucide-react";

export function AppLogo() {
  return (
    <Box
      w={10}
      h={10}
      bgGradient="linear(to-r, blue.500, purple.600)"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <WalletIcon width={24} height={24} color="white" />
    </Box>
  );
}
