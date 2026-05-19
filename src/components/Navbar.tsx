import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/gifts", label: "Gifts" },
  { to: "/custom-order", label: "Custom Order" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-gold opacity-60" />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Royal Mobile Accessories" width={36} height={36} className="drop-shadow-[0_0_8px_oklch(0.78_0.14_75/.45)]" />
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl text-gradient-gold font-semibold">Royal</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground -mt-0.5">Mobile Accessories</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-muted-foreground hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/shop" className="hidden sm:inline-flex p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary">
            <Search size={18} />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary">
            <ShoppingCart size={20} className="text-primary" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] min-w-[18px] h-[18px] rounded-full grid place-items-center font-semibold px-1">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="lg:hidden p-2 -mr-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <ul className="px-4 py-3 grid gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-secondary text-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
