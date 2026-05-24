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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-zinc-100"
    >
      {/* Image */}
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block relative aspect-square overflow-hidden bg-zinc-50"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-1 left-1 sm:top-3 sm:left-3 bg-amber-500 text-white text-[7px] sm:text-[10px] px-1.5 sm:px-3 py-0.5 rounded-full font-semibold">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-1 right-1 sm:top-3 sm:right-3 bg-rose-600 text-white text-[7px] sm:text-xs px-1.5 sm:px-3 py-0.5 rounded-full font-semibold">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-5">
        {/* Category */}
        <div className="text-[8px] sm:text-xs uppercase tracking-wide text-zinc-500 line-clamp-1">
          {product.category}
        </div>

        {/* Product Name */}
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block mt-1"
        >
          <h3 className="font-medium text-[10px] sm:text-base leading-tight line-clamp-1 text-zinc-900 group-hover:text-rose-700">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1 sm:mt-2">
          <Star size={10} className="text-amber-500 fill-current sm:w-3.5 sm:h-3.5" />
          <span className="text-[9px] sm:text-sm text-zinc-600">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-2 mt-1 sm:mt-3">
          <span className="text-xs sm:text-2xl font-semibold text-zinc-900">
            ₹{product.price}
          </span>
          <span className="text-[8px] sm:text-sm line-through text-zinc-400">
            ₹{product.mrp}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            add(product);
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-2 sm:mt-5 w-full bg-rose-600 hover:bg-rose-700 text-white text-[9px] sm:text-sm font-medium py-1.5 sm:py-3 rounded-lg sm:rounded-2xl flex items-center justify-center gap-1 sm:gap-2"
        >
          <ShoppingCart size={10} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </motion.div>
  );
}