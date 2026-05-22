import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "../../public/logoGoldNoBG.png";

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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-zinc-100 shadow-sm">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Royal Mobile Accessories"
            width={38}
            height={38}
            className="drop-shadow-md transition-transform group-hover:scale-105"
          />
          <div className="leading-none">
            <div className="font-display text-2xl tracking-tight bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-semibold">
              Royal
            </div>
            <div className="text-[10px] tracking-[1.5px] uppercase text-zinc-500 -mt-0.5">
              MOBILE ACCESSORIES
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-zinc-600 hover:text-rose-600 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-rose-600 hover:after:w-full after:transition-all"
                activeProps={{ className: "text-rose-600" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/shop"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-zinc-100 text-zinc-600 hover:text-rose-600 transition-all"
          >
            <Search size={19} />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-9 h-9 rounded-2xl hover:bg-zinc-100 text-zinc-700 hover:text-rose-600 transition-all"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full grid place-items-center shadow">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-zinc-100 bg-white">
          <ul className="px-5 py-6 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 rounded-xl transition-colors"
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