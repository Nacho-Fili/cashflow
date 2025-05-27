import { SidebarLogo } from "../atoms/SidebarLogo";
import { SidebarTitle } from "../atoms/SidebarTitle";

export function SidebarHeader() {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <SidebarLogo />
      <SidebarTitle />
    </div>
  );
}
