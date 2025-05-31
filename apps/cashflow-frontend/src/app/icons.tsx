

import React from 'react';

export interface IconProps {
  className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const BankIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M4.5 9h15M4 21h16M6.75 21v-9M17.25 21v-9M6 9H3.75C3.336 9 3 8.664 3 8.25V6.75C3 6.336 3.336 6 3.75 6H6M18 9h2.25c.414 0 .75-.336.75-.75V6.75c0-.414-.336-.75-.75-.75H18" />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

export const ArrowTrendingUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
</svg>
);

export const ArrowTrendingDownIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941" />
</svg>
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => ( // Can be used for Loans
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.036-6.372A7.5 7.5 0 006.372 19.5M19.5 4.5a7.5 7.5 0 00-1.872 1.872m12.128 12.128A7.5 7.5 0 0017.628 4.5m-13.5 13.5A7.5 7.5 0 004.5 6.372m10.504 10.504a7.5 7.5 0 001.872-1.872" />
  </svg>
);

// Used for Nav "Cuentas" (now "Bancos") and potentially other general wallet references
export const WalletIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.243A2.25 2.25 0 0118.75 20.25H5.25A2.25 2.25 0 013 18.243V12m18 0V9.75A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v2.25M3.75 12H20.25m-16.5 0V6.75c0-1.036.84-1.875 1.875-1.875h10.5C17.535 4.875 18.375 5.715 18.375 6.75v5.25c0 1.036-.84 1.875-1.875 1.875h-10.5A1.875 1.875 0 013.75 12z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const ChartPieIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => ( // Alias for ArrowLeftOnRectangleIcon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

// Icon for "Balance Total" Stat Card
export const StatCardWalletIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.243A2.25 2.25 0 0118.75 20.25H5.25A2.25 2.25 0 013 18.243V12m18 0V9.75A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v2.25m18 0A2.25 2.25 0 0021 12H3m18 0c0 1.657-1.007 3-2.25 3S16.5 13.657 16.5 12c0-1.657 1.007-3 2.25-3s2.25 1.343 2.25 3z" />
    </svg>
);

// Icon for "Ahorros" Stat Card
export const StatCardPiggyBankIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 9.75-7.5 9.75s-7.5-2.608-7.5-9.75S7.36 3 12 3s7.5 0.358 7.5 7.5zm-7.5 4.5S9 13.875 9 12c0-1.875 1.125-3.75 3-3.75s3 1.875 3 3.75c0 1.875-1.5 3-1.5 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v3M10.5 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5.25 4.5h.008v.008H5.25V4.5zm13.5 0h.008v.008H18.75V4.5z" />
    </svg>
);

// Logo Icon for Sidebar
export const FinanceAppLogoIcon: React.FC<IconProps> = ({className = "w-10 h-10"}) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.098A.75.75 0 003 6.75v10.5a.75.75 0 00.366.652l8.256 4.496a.75.75 0 00.756 0l8.256-4.496A.75.75 0 0021 17.25V6.75a.75.75 0 00-.366-.652L12.378 1.602zM4.5 7.088L12 11.16l7.5-4.072L12 2.84 4.5 7.088zm0 9.193V8.517l7.5 4.072v7.764L4.5 16.28zm8.25 3.911V12.59l7.5-4.072v7.764l-7.5 4.07z"></path>
    </svg>
);

export const ArrowUturnLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
  </svg>
);
