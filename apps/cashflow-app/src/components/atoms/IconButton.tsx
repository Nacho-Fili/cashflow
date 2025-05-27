import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: ReactNode;
  label?: string;
};

export function IconButton({ icon, label, ...props }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      borderRadius="lg"
      justifyContent="flex-start"
      width="100%"
      {...props}
    >
      <HStack gap={3}>
        {icon}
        {label && <Text as="span" fontWeight="medium">{label}</Text>}
      </HStack>
    </Button>
  );
}
