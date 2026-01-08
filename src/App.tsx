import { useTheme } from "@/app/providers/useTheme";
import IconButton from "@/app/shared/components/IconButton";
import MembersPage from "@/app/pages/MembersPage";
import { Moon, Sun } from "lucide-react";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-900 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <div className="text-base font-semibold">User Management</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Admin dashboard</div>
          </div>
          <IconButton onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </IconButton>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <MembersPage />
      </main>
    </div>
  );
};

export default App;
