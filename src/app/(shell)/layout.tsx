import { AccountGate } from "@/modules/account/components/organisms";
import { Titlebar } from "@/modules/shell/components/molecules";
import { BootGate } from "@/modules/shell/components/organisms";

export default function ShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BootGate>
      <AccountGate>
        <Titlebar />
        <div className="flex flex-1 flex-col overflow-auto">{children}</div>
      </AccountGate>
    </BootGate>
  );
}
