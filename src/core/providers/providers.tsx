import { AccountProvider } from "@/modules/account/providers";
import { AppStoreProvider } from "@/modules/shell/store/appSlice";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <AccountProvider>{children}</AccountProvider>
    </AppStoreProvider>
  );
}
