import { AccountProvider } from "@/modules/account/providers";
import { ItemsProvider, ThemeProvider } from "@/modules/shell/providers";
import { AppStoreProvider } from "@/modules/shell/store/appSlice";

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <AccountProvider>
        <ThemeProvider>
          <ItemsProvider>{children}</ItemsProvider>
        </ThemeProvider>
      </AccountProvider>
    </AppStoreProvider>
  );
}
