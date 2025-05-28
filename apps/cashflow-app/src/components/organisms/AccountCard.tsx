'use client';

import React from 'react';
import { Box, chakra, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { LandmarkIcon } from 'lucide-react'; // Using LandmarkIcon as a placeholder

interface AccountBalance {
  amount: number;
  currencySymbol: string;
  currencyCode: string;
}

export interface AccountCardProps {
  accountId: string;
  accountName: string;
  accountType?: string;
  balances: AccountBalance[];
  icon?: React.ElementType;
  // colorScheme based on account type or other criteria could be added later
}

export function AccountCard({
  accountName,
  accountType,
  balances,
  icon: IconElement = LandmarkIcon,
}: AccountCardProps) {
  return (
    <Box bg="#1F2937" borderRadius="xl" p={6} color="white" minH="180px">
      <VStack align="stretch" gap={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack alignItems="flex-start" gap={1}>
            <Text fontSize="md" color="#9CA3AF">
              {accountType || 'Cuenta'}
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {accountName}
            </Text>
          </VStack>
          <Box
            bg={'gray.700'} // Placeholder color
            color={'white'}
            borderRadius="lg"
            p={3}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={IconElement} boxSize={6} />
          </Box>
        </HStack>
        
        <VStack alignItems="flex-start" gap={1}>
          {balances.length > 0 ? (
            balances.map((balance, index) => (
              <Text key={index} fontSize="2xl" fontWeight="bold">
                {balance.currencySymbol}
                {balance.amount.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <chakra.span fontSize="md" color="#9CA3AF" ml={2}>
                  {balance.currencyCode}
                </chakra.span>
              </Text>
            ))
          ) : (
            <Text fontSize="lg" color="#9CA3AF">
              No hay balances disponibles
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
