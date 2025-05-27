import { WalletIcon } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <WalletIcon className="w-6 h-6 text-white" />
    </div>
  );
}
