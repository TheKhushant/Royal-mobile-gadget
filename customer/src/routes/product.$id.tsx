import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ShoppingCart,
  MessageCircle,
  Truck,
  Shield,
  Star,
  ArrowLeft,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="py-20 text-center text-sm text-muted-foreground">
      Product not found.
    </div>
  ),
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4);

  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  const waMsg = `Hi Royal Mobile Accessories! I'm interested in ${p.name} (₹${p.price}). Is it available?`;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-10">
      {/* Back */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-xs sm:text-sm text-zinc-500 hover:text-rose-600 mb-4 sm:mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Shop
      </Link>

     <div className="grid md:grid-cols-2 gap-5 sm:gap-10">
        {/* Image */}
        <div className="flex justify-center">
          <div className="royal-border bg-white rounded-xl sm:rounded-3xl overflow-hidden aspect-square shadow-sm w-56 sm:w-80">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
        </div>
        {/* Details */}
        <div className="space-y-3 sm:space-y-5">
          <div className="text-[10px] sm:text-xs uppercase tracking-wide text-rose-600 font-medium">
            {p.category}
          </div>

          <h1 className="font-display text-xl sm:text-4xl leading-tight tracking-tight">
            {p.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star size={14} fill="currentColor" className="text-amber-500" />
            <span className="font-medium text-sm sm:text-base">{p.rating}</span>
            <span className="text-zinc-500 text-[11px] sm:text-sm">
              (238 reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xl sm:text-4xl font-semibold text-zinc-900">
              ₹{p.price}
            </span>

            <span className="text-sm sm:text-xl line-through text-zinc-400">
              ₹{p.mrp}
            </span>

            {off > 0 && (
              <span className="bg-rose-600 text-white text-[10px] sm:text-sm font-bold px-2 sm:px-4 py-0.5 rounded-xl">
                -{off}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-zinc-600 leading-relaxed text-xs sm:text-[15px]">
            {p.description}
          </p>

          {/* Specs */}
          {p.specs && (
            <div className="royal-border bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5">
              <div className="uppercase text-[10px] sm:text-xs tracking-wide text-rose-600 mb-2 sm:mb-4">
                Specifications
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xs sm:text-sm text-zinc-700">
                {p.specs.map((s: string) => (
                  <li key={s} className="flex items-start gap-1">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Delivery */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-xs sm:text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <Truck className="text-emerald-600" size={14} />
              Free Delivery in Nagpur
            </span>

            <span className="inline-flex items-center gap-1">
              <Shield className="text-amber-600" size={14} />
              6 Months Warranty
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-1.5 hover:bg-zinc-100 text-base"
              >
                −
              </button>

              <span className="px-4 font-semibold text-sm sm:text-base">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1.5 hover:bg-zinc-100 text-base"
              >
                +
              </button>
            </div>

            <span className="text-emerald-600 text-xs sm:text-sm font-medium">
              ✓ In Stock
            </span>
          </div>

          {/* Buttons */}
          {/* Add to Cart */}
          <button
            onClick={() => {
              add(p, qty);
              toast.success(`${p.name} added to cart`);
            }}
            className="w-full border border-zinc-300 hover:border-zinc-400 font-medium text-xs sm:text-base py-2 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          {/* Buy Now + WhatsApp */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-2">
            <Link
              to="/cart"
              onClick={() => add(p, qty)}
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white font-medium text-xs sm:text-base py-2 sm:py-4 rounded-xl sm:rounded-2xl text-center shadow-md transition-all flex items-center justify-center"
            >
              Buy Now
            </Link>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white py-2 sm:py-4 rounded-xl sm:rounded-2xl inline-flex items-center justify-center gap-2 text-xs sm:text-base font-medium hover:brightness-110 transition-all"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10 sm:mt-20">
          <h2 className="font-display text-lg sm:text-3xl mb-4 sm:mb-8">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}