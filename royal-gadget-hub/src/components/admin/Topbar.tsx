import { LogOut, User, Menu } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface TopbarProps {
  onMobileMenuClick?: () => void;
}

export function Topbar({ onMobileMenuClick }: TopbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-4 md:px-6">
      
      {/* Left Side - Hamburger for Mobile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="md:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-sm text-muted-foreground">Welcome back,</h2>
          <p className="font-semibold text-sm">{user?.name || user?.email || "Admin"}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}