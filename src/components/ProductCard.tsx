import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-zinc-100 hover:border-zinc-200 transition-all duration-300"
    >
      {/* Image Container */}
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative aspect-square overflow-hidden bg-zinc-50"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-2xl shadow">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
          {product.category}
        </div>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block mt-2"
        >
          <h3 className="font-semibold text-base leading-tight line-clamp-2 text-zinc-900 group-hover:text-rose-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <div className="flex text-amber-500">
            <Star size={14} fill="currentColor" />
          </div>
          <span className="text-sm font-medium text-zinc-600">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-semibold text-zinc-900">₹{product.price}</span>
          <span className="text-sm line-through text-zinc-400">₹{product.mrp}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            add(product);
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-5 w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.985] shadow-md shadow-rose-500/30"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}