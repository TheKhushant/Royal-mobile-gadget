import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, FolderTree, Image as ImageIcon, MessageSquare, ChevronLeft, Zap } from "lucide-react";
import { useState } from "react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: FolderTree },
  { to: "/banners", label: "Banners", icon: ImageIcon },
  { to: "/reviews", label: "Reviews", icon: MessageSquare },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"} hidden md:flex flex-col bg-card border-r border-border transition-all duration-200`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">Royal Mobile</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-muted text-muted-foreground"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {items.map((it) => {
          const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{it.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}