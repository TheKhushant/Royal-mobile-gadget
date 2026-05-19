import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group royal-border rounded-xl overflow-hidden shadow-card hover:shadow-gold transition-shadow"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gradient-royal text-accent-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded">
          -{off}%
        </span>
      </Link>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.category}</div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-medium mt-1 line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-xs text-gold-soft">
          <Star size={12} fill="currentColor" /> {product.rating}
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-semibold text-primary">₹{product.price}</span>
          <span className="text-xs line-through text-muted-foreground">₹{product.mrp}</span>
        </div>
        <button
          onClick={() => {
            add(product);
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-3 w-full bg-gradient-gold text-primary-foreground font-medium text-sm py-2 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
