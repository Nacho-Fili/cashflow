'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, chakra, SimpleGrid, Text, Button, useDisclosure,
} from '@chakra-ui/react';
import { AccountCard, AccountCardProps } from '../organisms/AccountCard';
import { CashflowApiService } from '@cashflow/shared';
import { LandmarkIcon, CreditCardIcon, PiggyBankIcon, BriefcaseIcon } from 'lucide-react';
import { AddBankModal } from '../molecules/AddBankModal';

// Helper function to map account types to icons (example)
const getAccountIcon = (accountType?: string) => {
  if (!accountType) return LandmarkIcon;
  const lowerAccountType = accountType.toLowerCase();
  if (lowerAccountType.includes('crédito') || lowerAccountType.includes('credit')) {
    return CreditCardIcon;
  }
  if (lowerAccountType.includes('ahorro') || lowerAccountType.includes('saving')) {
    return PiggyBankIcon;
  }
  if (lowerAccountType.includes('inversión') || lowerAccountType.includes('investment')) {
    return BriefcaseIcon;
  }
  return LandmarkIcon;
};

export function AccountsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accounts, setAccounts] = useState<AccountCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // fetch accounts function reused for initial load and after create
  const fetchAccounts = async () => {
    const api = new CashflowApiService();
    try {
      setLoading(true);
      const banks = await api.getBanks();
      const accountsList = banks.map(bank => ({
        accountId: bank.id,
        accountName: bank.name,
        accountType: bank.description || 'Cuenta Bancaria',
        icon: getAccountIcon(bank.description),
        balances: bank.balances 
          ? bank.balances.map(b => ({ 
              amount: b.amount, 
              currencySymbol: b.currency.symbol, 
              currencyCode: b.currency.code 
            })) 
          : [],
      }));
      setAccounts(accountsList);
      setError(null);
    } catch (e) {
      setError('Error al cargar las cuentas. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchAccounts();
  }, []);

  if (!isMounted) return null;

  if (loading) return <Text color="white">Cargando cuentas...</Text>;

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box flex={1} p={6} ml={{ base: 0, md: '256px' }} mt={{ base: '60px', md: 0 }}>
      <chakra.div maxW="1280px" mx="auto">
        <chakra.h1 fontSize="2xl" fontWeight="bold" color="white" mb={8}>
          Mis Cuentas
        </chakra.h1>
        {accounts.length === 0 && !loading && (
          <Box textAlign="center" py={20}>
            <Text color="gray.400" fontSize="lg" mb={4}>No se encontraron cuentas.</Text>
            <Button colorScheme="teal" onClick={() => {/* TODO: open modal */}}>
              Agregar Banco
            </Button>
          </Box>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {accounts.map(account => (
            <AccountCard key={account.accountId} {...account} />
          ))}
        </SimpleGrid>

        {/* Modal for creating a new bank */}
        <Dialog.Root>
          <Dialog.Content bg="gray.800" color="white">
            <Dialog.Header>Configurar Nuevo Banco</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Field.Root mb={4}>
                <Field.Label>Nombre del Banco</Field.Label>
                <Input value={newBankName} onChange={e => setNewBankName(e.target.value)} />
              </Field.Root>
              <Field.Root mb={4}>
                <Field.Label>Descripción</Field.Label>
                <Input value={newBankDesc} onChange={e => setNewBankDesc(e.target.value)} />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
              <Button colorScheme="teal" onClick={async () => {
                const api = new CashflowApiService();
                await api.createBank({ name: newBankName, description: newBankDesc });
                onClose(); setNewBankName(''); setNewBankDesc('');
                fetchAccounts();
              }}>
                Crear Banco
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </chakra.div>
    </Box>
  );
}
